<p align="center">
  <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/TypeScript-5.3-blue?style=for-the-badge&logo=typescript" />
  <img src="https://img.shields.io/badge/FastAPI-0.104-009688?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase" />
  <img src="https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000?style=for-the-badge&logo=vercel" />
</p>

# ✈️ AeroSentinel AI — Intelligent Aviation Safety Platform

> **Predict. Protect. Prevent.**
> AI-powered real-time flight risk prediction, anomaly detection, and emergency intelligence system for modern aviation safety operations.

🔗 **Live Demo:** [https://aero-sentinel-ai-3leq.vercel.app](https://aero-sentinel-ai-3leq.vercel.app)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [ML Service](#-ml-service)
- [Database Schema](#-database-schema)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**AeroSentinel AI** is a full-stack aviation safety platform that combines real-time telemetry analysis with machine learning to provide:

- **Flight Risk Prediction** — ML models analyze engine temperature, altitude, fuel consumption, weather risk, and vibration to generate real-time risk scores (0–100).
- **Anomaly Detection** — Statistical and threshold-based detection of unusual patterns in critical flight parameters.
- **Emergency Intelligence** — Automatic recommendation of nearest airports, diversion routes, and emergency procedures when risk exceeds safe thresholds.
- **Live Dashboard** — Interactive, real-time monitoring dashboard with telemetry charts, risk gauges, flight status maps, and alert panels.

---

## 🚀 Key Features

| Module | Description |
|--------|-------------|
| 🧠 **AI Risk Prediction** | GradientBoosting & RandomForest models trained on synthetic aviation data for multi-class risk classification (Low / Medium / High) |
| 📊 **Real-time Telemetry** | Live engine temp, altitude, fuel flow, vibration, cabin pressure charts with auto-refresh every 30 seconds |
| ⚠️ **Anomaly Detection** | Threshold + statistical outlier (z-score) based alerting on engine, altitude, fuel, and vibration parameters |
| 🆘 **Emergency Response** | Nearest airport finder with heading, distance (nm), runway info, and step-by-step emergency procedures |
| 🗺️ **Flight Status Map** | Monitor multiple flights with real-time status (en-route / landed / delayed / emergency) |
| 🔐 **Auth & Security** | User signup/login with Supabase Auth, role-based access (pilot / admin / operator), Row Level Security |
| 💰 **Pricing Tiers** | Starter (free), Professional ($299/mo), Enterprise (custom) plans |
| 🎨 **Modern UI** | Dark theme with neon accents, glassmorphism, Framer Motion animations, fully responsive |

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router & API Routes |
| **TypeScript** | Type-safe development |
| **TailwindCSS 3.4** | Utility-first CSS with custom neon theme |
| **Radix UI / ShadCN** | Accessible, composable UI primitives |
| **Framer Motion** | Smooth page & component animations |
| **Recharts** | Interactive data visualization charts |
| **Lucide React** | Modern icon library |

### Backend
| Technology | Purpose |
|-----------|---------|
| **Next.js API Routes** | REST API endpoints for telemetry, risk prediction, anomalies, emergencies |
| **Supabase** | PostgreSQL database + Auth + Row Level Security |
| **Supabase JS SDK** | Client & admin database operations |

### ML Service (Python Microservice)
| Technology | Purpose |
|-----------|---------|
| **FastAPI** | High-performance ML API server |
| **Scikit-learn** | GradientBoostingClassifier for risk classification |
| **NumPy / Pandas** | Numerical & data processing |
| **Joblib** | Model persistence & caching |
| **Uvicorn** | ASGI server |

### Deployment
| Service | Purpose |
|---------|---------|
| **Vercel** | Frontend & API hosting |
| **Supabase Cloud** | Managed PostgreSQL database |
| **Render / Railway** | ML microservice hosting (optional) |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                       │
│                  Next.js 14 + React + TailwindCSS           │
│          Landing Page │ Dashboard │ Auth Pages │ Pricing     │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   NEXT.JS API ROUTES                        │
│                                                             │
│  /api/telemetry          → Real-time telemetry generation   │
│  /api/predict-risk       → Flight risk score prediction     │
│  /api/anomaly-detect     → Anomaly detection engine         │
│  /api/emergency-recommendation → Emergency airport finder   │
│  /api/auth/login         → User authentication              │
│  /api/auth/signup        → User registration                │
└──────────┬──────────────────────────────┬───────────────────┘
           │                              │
           ▼                              ▼
┌─────────────────────┐     ┌─────────────────────────────────┐
│   SUPABASE CLOUD    │     │     ML SERVICE (FastAPI)         │
│                     │     │                                  │
│  PostgreSQL DB      │     │  /predict       → Risk score     │
│  Auth (JWT)         │     │  /predict/batch → Batch predict  │
│  Row Level Security │     │  /anomaly-detect→ Detect anomaly │
│  profiles           │     │  /model-info    → Model metadata │
│  flights            │     │                                  │
│  telemetry          │     │  GradientBoostingClassifier      │
│  anomaly_alerts     │     │  5 features × 3 classes          │
│  emergency_recs     │     │  Trained on 5000 synthetic pts   │
│  airports           │     └─────────────────────────────────┘
└─────────────────────┘
```

---

## 📁 Project Structure

```
AeroSentinel-AI/
├── src/
│   ├── app/
│   │   ├── page.tsx                    # Landing page (Hero, Features, Architecture, Pricing, CTA)
│   │   ├── layout.tsx                  # Root layout with global fonts & metadata
│   │   ├── globals.css                 # Global styles, neon theme, animations
│   │   ├── dashboard/
│   │   │   └── page.tsx                # Real-time flight risk monitoring dashboard
│   │   ├── architecture/
│   │   │   └── page.tsx                # System architecture visualization page
│   │   ├── login/
│   │   │   └── page.tsx                # User login page
│   │   ├── signup/
│   │   │   └── page.tsx                # User registration page
│   │   ├── pricing/
│   │   │   └── page.tsx                # Pricing plans page
│   │   └── api/
│   │       ├── telemetry/
│   │       │   └── route.ts            # GET/POST telemetry data
│   │       ├── predict-risk/
│   │       │   └── route.ts            # POST risk prediction
│   │       ├── anomaly-detect/
│   │       │   └── route.ts            # GET/POST anomaly detection
│   │       ├── emergency-recommendation/
│   │       │   └── route.ts            # GET/POST emergency recommendations
│   │       └── auth/
│   │           ├── login/
│   │           │   └── route.ts        # POST user login
│   │           └── signup/
│   │               └── route.ts        # POST user registration
│   ├── components/
│   │   ├── dashboard/
│   │   │   ├── ai-insights-panel.tsx   # AI-generated safety insights
│   │   │   ├── anomaly-panel.tsx       # Anomaly alerts list
│   │   │   ├── emergency-panel.tsx     # Emergency recommendation display
│   │   │   ├── flight-status-map.tsx   # Flight tracking map grid
│   │   │   ├── risk-score-card.tsx     # Circular risk gauge component
│   │   │   ├── stats-card.tsx          # Dashboard statistics card
│   │   │   └── telemetry-chart.tsx     # Live telemetry line chart
│   │   └── ui/                         # Reusable ShadCN UI components
│   │       ├── badge.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── progress.tsx
│   │       ├── scroll-area.tsx
│   │       ├── separator.tsx
│   │       └── tabs.tsx
│   ├── lib/
│   │   ├── supabase.ts                # Supabase client (browser-side)
│   │   ├── supabase-admin.ts          # Supabase admin client (server-side)
│   │   └── utils.ts                   # Utility functions (cn, randomBetween, generateFlightId)
│   └── services/
│       └── flight-data.ts             # Flight data generation, risk scoring, anomaly detection
│
├── ml-service/
│   ├── main.py                        # FastAPI ML microservice (272 lines)
│   ├── requirements.txt               # Python dependencies
│   ├── Dockerfile                     # Docker container config
│   ├── Procfile                       # Heroku/Render deploy config
│   └── runtime.txt                    # Python runtime version
│
├── supabase/
│   └── schema.sql                     # Complete database schema (6 tables + seed data)
│
├── package.json                       # Node.js dependencies & scripts
├── next.config.js                     # Next.js configuration
├── tailwind.config.js                 # TailwindCSS custom theme config
├── tsconfig.json                      # TypeScript config
├── vercel.json                        # Vercel deployment config
├── postcss.config.js                  # PostCSS config
└── .env.example                       # Environment variable template
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ & **npm**
- **Python** 3.11+ (for ML service)
- **Supabase** account ([supabase.com](https://supabase.com))

### 1. Clone the Repository

```bash
git clone https://github.com/siddhesh940/AeroSentinel-AI.git
cd AeroSentinel-AI
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (see [Environment Variables](#-environment-variables)).

### 4. Setup Supabase Database

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor → New Query**
3. Paste the entire contents of `supabase/schema.sql` and click **Run**
4. Copy your project URL and keys from **Settings → API**
5. Enable **Email/Password** auth in **Authentication → Providers**

### 5. Run the Frontend

```bash
npm run dev
```

App will be live at `http://localhost:3000`

### 6. Run the ML Service (Optional)

```bash
cd ml-service
python -m venv venv
source venv/bin/activate      # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python main.py
```

ML API will be live at `http://localhost:8000`

---

## 🔑 Environment Variables

Create a `.env.local` file in the root directory:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://xxxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (server-only) | `eyJhbGciOi...` |
| `ML_SERVICE_URL` | URL of the Python ML microservice | `http://localhost:8000` |
| `NEXT_PUBLIC_APP_URL` | Public URL of the deployed app | `https://aero-sentinel-ai-3leq.vercel.app` |

---

## 📡 API Endpoints

### Telemetry

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/telemetry?points=30&anomalyRate=0.1` | Generate telemetry time-series data |
| `POST` | `/api/telemetry` | Generate a single real-time telemetry point |

### Risk Prediction

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/predict-risk` | Predict flight risk score from telemetry input |

**Request Body:**
```json
{
  "engine_temp": 245,
  "altitude": 32000,
  "fuel_usage": 1100,
  "weather_risk": 0.6,
  "vibration": 0.45
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "risk_score": 42,
    "classification": "Medium",
    "confidence": 0.93,
    "model": "RandomForest-v1.0",
    "timestamp": "2026-02-28T12:00:00.000Z"
  }
}
```

### Anomaly Detection

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/anomaly-detect?flightId=AG1234&points=30&anomalyRate=0.2` | Detect anomalies in generated telemetry |
| `POST` | `/api/anomaly-detect` | Detect anomalies in provided telemetry array |

### Emergency Recommendation

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/emergency-recommendation?flightId=AG1234&riskScore=75&lat=37.6&lng=-122.3` | Get emergency diversion recommendation |
| `POST` | `/api/emergency-recommendation` | Get recommendation with custom flight data |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Authenticate existing user |

---

## 🤖 ML Service

The Python FastAPI microservice provides production-grade ML predictions:

### Model Details

| Property | Value |
|----------|-------|
| **Algorithm** | GradientBoostingClassifier (scikit-learn) |
| **Training Data** | 5,000 synthetic aviation telemetry samples |
| **Features** | engine_temp, altitude, fuel_usage, weather_risk, vibration |
| **Classes** | Low (≤30), Medium (31–60), High (>60) |
| **Estimators** | 150 trees, max depth 5, learning rate 0.1 |
| **Persistence** | Joblib (auto-cached after first training) |
| **Auto-trains** | On first startup — no external data files needed |

### ML API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check & model status |
| `POST` | `/predict` | Single flight risk prediction |
| `POST` | `/predict/batch` | Batch prediction for multiple readings |
| `POST` | `/anomaly-detect` | Statistical anomaly detection |
| `GET` | `/model-info` | Model metadata & feature info |

### Running with Docker

```bash
cd ml-service
docker build -t aerosentinel-ml .
docker run -p 8000:8000 aerosentinel-ml
```

---

## 🗄️ Database Schema

The Supabase PostgreSQL database contains **6 tables**:

| Table | Description |
|-------|-------------|
| `profiles` | User profiles extending Supabase Auth (name, role, organization) |
| `flights` | Active flight records with status, risk score, coordinates |
| `telemetry` | Time-series telemetry data (engine, fuel, altitude, vibration, etc.) |
| `anomaly_alerts` | Detected anomaly events with severity & thresholds |
| `emergency_recommendations` | Emergency diversion records with nearest airports |
| `airports` | Reference table with 10 major US airports (LAX, SFO, DEN, ORD, DFW, etc.) |

Full schema with indexes, RLS policies, and seed data available in [`supabase/schema.sql`](supabase/schema.sql).

---

## 🌐 Deployment

### Frontend (Vercel)

1. Push code to GitHub
2. Import repository on [vercel.com](https://vercel.com)
3. Add environment variables (direct values, no `@` secret references)
4. Deploy — auto-builds on every push to `main`

🔗 **Live URL:** [https://aero-sentinel-ai-3leq.vercel.app](https://aero-sentinel-ai-3leq.vercel.app)

### ML Service (Render / Railway)

1. Create a new Web Service on [render.com](https://render.com) or [railway.app](https://railway.app)
2. Point to the `ml-service/` directory
3. Set build command: `pip install -r requirements.txt`
4. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Update `ML_SERVICE_URL` in Vercel env vars with the deployed URL

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ for aviation safety<br/>
  <strong>AeroSentinel AI</strong> — Predict. Protect. Prevent.<br/><br/>
  <a href="https://aero-sentinel-ai-3leq.vercel.app">🔗 Live Demo</a> · <a href="https://github.com/siddhesh940/AeroSentinel-AI">📦 GitHub</a>
</p>
