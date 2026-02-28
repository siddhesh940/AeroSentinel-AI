"""
AeroGuardian AI – ML Risk Prediction Service
FastAPI microservice for flight risk prediction & anomaly detection
"""

import os
import numpy as np
import joblib
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
from contextlib import asynccontextmanager

# ── Train & persist model on startup ──────────────────────────────────────────
MODEL_PATH = os.path.join(os.path.dirname(__file__), "model.joblib")

def train_model():
    """Train a RandomForest + XGBoost ensemble on synthetic aviation data."""
    from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
    from sklearn.model_selection import train_test_split

    np.random.seed(42)
    n = 5000

    engine_temp = np.random.normal(200, 30, n)
    altitude = np.random.normal(35000, 5000, n)
    fuel_usage = np.random.normal(1000, 200, n)
    weather_risk = np.random.uniform(0, 1, n)
    vibration = np.random.normal(0.3, 0.2, n)

    # Composite risk score based on realistic thresholds
    risk = (
        np.clip((engine_temp - 180) / 170, 0, 1) * 30 +
        np.clip((1 - altitude / 45000), 0, 1) * 20 +
        np.clip((fuel_usage - 800) / 1700, 0, 1) * 20 +
        weather_risk * 15 +
        np.clip(vibration / 1.0, 0, 1) * 15 +
        np.random.normal(0, 3, n)
    )
    risk = np.clip(risk, 0, 100)

    # Classify: 0=Low(≤30), 1=Medium(31-60), 2=High(>60)
    labels = np.where(risk <= 30, 0, np.where(risk <= 60, 1, 2))

    X = np.column_stack([engine_temp, altitude, fuel_usage, weather_risk, vibration])
    X_train, X_test, y_train, y_test = train_test_split(X, labels, test_size=0.2, random_state=42)

    model = GradientBoostingClassifier(
        n_estimators=150, max_depth=5, learning_rate=0.1, random_state=42
    )
    model.fit(X_train, y_train)

    accuracy = model.score(X_test, y_test)
    print(f"✅ Model trained — accuracy: {accuracy:.3f}")

    joblib.dump(model, MODEL_PATH)
    return model


def load_or_train_model():
    if os.path.exists(MODEL_PATH):
        print("📦 Loading cached model...")
        return joblib.load(MODEL_PATH)
    print("🔧 Training new model...")
    return train_model()


# ── FastAPI app ───────────────────────────────────────────────────────────────
model = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    global model
    model = load_or_train_model()
    yield

app = FastAPI(
    title="AeroGuardian AI – ML Service",
    version="1.0.0",
    description="Flight risk prediction & anomaly detection engine",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ── Schemas ───────────────────────────────────────────────────────────────────
class PredictionInput(BaseModel):
    engine_temp: float = Field(..., ge=0, le=500, description="Engine temperature °C")
    altitude: float = Field(..., ge=0, le=60000, description="Altitude in feet")
    fuel_usage: float = Field(..., ge=0, le=5000, description="Fuel consumption kg/h")
    weather_risk: float = Field(..., ge=0, le=1, description="Weather risk factor 0-1")
    vibration: float = Field(..., ge=0, le=3, description="Vibration g-force")

class PredictionOutput(BaseModel):
    risk_score: float
    risk_level: str
    confidence: float
    contributing_factors: List[dict]

class BatchInput(BaseModel):
    readings: List[PredictionInput]

class AnomalyInput(BaseModel):
    engine_temp: List[float]
    altitude: List[float]
    fuel_usage: List[float]
    vibration: List[float]

class AnomalyOutput(BaseModel):
    anomalies: List[dict]
    total_anomalies: int
    severity: str

class HealthOutput(BaseModel):
    status: str
    model_loaded: bool
    version: str


# ── Helpers ───────────────────────────────────────────────────────────────────
RISK_LABELS = {0: "Low", 1: "Medium", 2: "High"}

def compute_risk_score(input_data: PredictionInput) -> float:
    """Compute a continuous 0-100 risk score from telemetry."""
    score = (
        max(0, min((input_data.engine_temp - 180) / 170, 1)) * 30 +
        max(0, min(1 - input_data.altitude / 45000, 1)) * 20 +
        max(0, min((input_data.fuel_usage - 800) / 1700, 1)) * 20 +
        input_data.weather_risk * 15 +
        max(0, min(input_data.vibration / 1.0, 1)) * 15
    )
    return round(max(0, min(100, score)), 1)

def get_contributing_factors(inp: PredictionInput) -> List[dict]:
    factors = []
    if inp.engine_temp > 250:
        factors.append({"factor": "Engine Temperature", "severity": "high", "value": f"{inp.engine_temp:.0f}°C"})
    elif inp.engine_temp > 220:
        factors.append({"factor": "Engine Temperature", "severity": "medium", "value": f"{inp.engine_temp:.0f}°C"})
    if inp.altitude < 20000:
        factors.append({"factor": "Low Altitude", "severity": "high", "value": f"{inp.altitude:.0f}ft"})
    if inp.fuel_usage > 1500:
        factors.append({"factor": "Fuel Consumption", "severity": "high", "value": f"{inp.fuel_usage:.0f}kg/h"})
    elif inp.fuel_usage > 1200:
        factors.append({"factor": "Fuel Consumption", "severity": "medium", "value": f"{inp.fuel_usage:.0f}kg/h"})
    if inp.weather_risk > 0.7:
        factors.append({"factor": "Weather Risk", "severity": "high", "value": f"{inp.weather_risk:.1%}"})
    if inp.vibration > 0.7:
        factors.append({"factor": "Vibration", "severity": "high", "value": f"{inp.vibration:.2f}g"})
    elif inp.vibration > 0.5:
        factors.append({"factor": "Vibration", "severity": "medium", "value": f"{inp.vibration:.2f}g"})
    return factors


# ── Routes ────────────────────────────────────────────────────────────────────
@app.get("/", response_model=HealthOutput)
async def health_check():
    return HealthOutput(status="healthy", model_loaded=model is not None, version="1.0.0")


@app.post("/predict", response_model=PredictionOutput)
async def predict_risk(input_data: PredictionInput):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    features = np.array([[
        input_data.engine_temp,
        input_data.altitude,
        input_data.fuel_usage,
        input_data.weather_risk,
        input_data.vibration,
    ]])

    prediction = model.predict(features)[0]
    probabilities = model.predict_proba(features)[0]
    risk_score = compute_risk_score(input_data)
    confidence = float(max(probabilities))

    return PredictionOutput(
        risk_score=risk_score,
        risk_level=RISK_LABELS.get(int(prediction), "Unknown"),
        confidence=round(confidence, 3),
        contributing_factors=get_contributing_factors(input_data),
    )


@app.post("/predict/batch", response_model=List[PredictionOutput])
async def predict_batch(batch: BatchInput):
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    results = []
    for reading in batch.readings:
        features = np.array([[
            reading.engine_temp, reading.altitude,
            reading.fuel_usage, reading.weather_risk, reading.vibration,
        ]])
        prediction = model.predict(features)[0]
        probabilities = model.predict_proba(features)[0]
        results.append(PredictionOutput(
            risk_score=compute_risk_score(reading),
            risk_level=RISK_LABELS.get(int(prediction), "Unknown"),
            confidence=round(float(max(probabilities)), 3),
            contributing_factors=get_contributing_factors(reading),
        ))
    return results


@app.post("/anomaly-detect", response_model=AnomalyOutput)
async def detect_anomalies(data: AnomalyInput):
    anomalies = []

    def check_series(values: List[float], name: str, threshold_high: float, threshold_low: Optional[float] = None):
        arr = np.array(values)
        mean, std = np.mean(arr), np.std(arr)
        for i, v in enumerate(values):
            is_anomaly = False
            reason = ""
            if v > threshold_high:
                is_anomaly = True
                reason = f"Exceeds threshold ({v:.1f} > {threshold_high})"
            elif threshold_low is not None and v < threshold_low:
                is_anomaly = True
                reason = f"Below threshold ({v:.1f} < {threshold_low})"
            elif std > 0 and abs(v - mean) > 2.5 * std:
                is_anomaly = True
                reason = f"Statistical outlier (z={abs(v-mean)/std:.1f})"
            if is_anomaly:
                anomalies.append({
                    "index": i,
                    "parameter": name,
                    "value": round(v, 2),
                    "reason": reason,
                    "severity": "critical" if abs(v - mean) > 3 * std or v > threshold_high * 1.2 else "warning",
                })

    check_series(data.engine_temp, "engine_temp", 280)
    check_series(data.altitude, "altitude", 45000, 15000)
    check_series(data.fuel_usage, "fuel_usage", 1800)
    check_series(data.vibration, "vibration", 0.8)

    critical_count = sum(1 for a in anomalies if a["severity"] == "critical")
    severity = "critical" if critical_count > 0 else ("warning" if anomalies else "normal")

    return AnomalyOutput(anomalies=anomalies, total_anomalies=len(anomalies), severity=severity)


@app.get("/model-info")
async def model_info():
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")
    return {
        "type": type(model).__name__,
        "n_features": 5,
        "feature_names": ["engine_temp", "altitude", "fuel_usage", "weather_risk", "vibration"],
        "classes": ["Low", "Medium", "High"],
        "n_estimators": getattr(model, "n_estimators", None),
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
