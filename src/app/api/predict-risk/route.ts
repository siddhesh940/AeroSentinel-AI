import {
    generateTelemetryPoint,
    predictRiskScore,
} from "@/services/flight-data";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { engine_temp, altitude, fuel_usage, weather_risk, vibration } = body;

    // Use provided values or generate simulated data
    const telemetry = generateTelemetryPoint();
    const input = {
      ...telemetry,
      engine_temp: engine_temp ?? telemetry.engine_temp,
      altitude: altitude ?? telemetry.altitude,
      fuel_consumption: fuel_usage ?? telemetry.fuel_consumption,
      weather_risk: weather_risk ?? telemetry.weather_risk,
      vibration: vibration ?? telemetry.vibration,
    };

    const riskScore = predictRiskScore(input);

    let classification: "Low" | "Medium" | "High" | "Critical";
    if (riskScore <= 25) classification = "Low";
    else if (riskScore <= 50) classification = "Medium";
    else if (riskScore <= 75) classification = "High";
    else classification = "Critical";

    return NextResponse.json({
      success: true,
      data: {
        risk_score: riskScore,
        classification,
        input: {
          engine_temp: input.engine_temp,
          altitude: input.altitude,
          fuel_consumption: input.fuel_consumption,
          weather_risk: input.weather_risk,
          vibration: input.vibration,
        },
        model: "RandomForest-v1.0",
        timestamp: new Date().toISOString(),
        confidence: 0.89 + Math.random() * 0.1,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to predict risk" },
      { status: 500 },
    );
  }
}

export async function GET() {
  // Generate a prediction with random simulated data
  const telemetry = generateTelemetryPoint();
  const riskScore = predictRiskScore(telemetry);

  let classification: "Low" | "Medium" | "High" | "Critical";
  if (riskScore <= 25) classification = "Low";
  else if (riskScore <= 50) classification = "Medium";
  else if (riskScore <= 75) classification = "High";
  else classification = "Critical";

  return NextResponse.json({
    success: true,
    data: {
      risk_score: riskScore,
      classification,
      input: {
        engine_temp: telemetry.engine_temp,
        altitude: telemetry.altitude,
        fuel_consumption: telemetry.fuel_consumption,
        weather_risk: telemetry.weather_risk,
        vibration: telemetry.vibration,
      },
      model: "RandomForest-v1.0",
      timestamp: new Date().toISOString(),
      confidence: 0.89 + Math.random() * 0.1,
    },
  });
}
