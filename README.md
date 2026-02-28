# ✈️ AeroGuardian AI

### Predictive Aviation Safety & Emergency Intelligence System

> AI-powered aviation safety monitoring platform that predicts flight risks, detects anomalies, and provides emergency recommendations through an interactive dashboard.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

| Feature                    | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| **Flight Risk Dashboard**  | Real-time risk scores, telemetry charts, anomaly alerts            |
| **AI Risk Prediction**     | ML-powered risk scoring (GradientBoosting / XGBoost)               |
| **Anomaly Detection**      | Statistical anomaly detection on engine, altitude, fuel, vibration |
| **Emergency Intelligence** | Auto-recommend nearest airport & emergency actions                 |
| **SaaS Landing Page**      | Modern Stripe/Vercel-style dark-theme landing page                 |
| **Authentication**         | Supabase Auth (email/password signup & login)                      |
| **Architecture Viewer**    | Interactive system architecture documentation                      |
| **Pricing Page**           | Mock pricing tiers (Starter / Professional / Enterprise)           |

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────┐
│              Next.js Frontend            │
│   (React • TypeScript • TailwindCSS)     │
│   ┌────────┐ ┌──────────┐ ┌──────────┐  │
│   │Landing │ │Dashboard │ │  Auth    │  │
│   │  Page  │ │  + Maps  │ │ Pages   │  │
│   └────────┘ └──────────┘ └──────────┘  │
├──────────────────────────────────────────┤
│           Next.js API Routes             │
│  /api/predict-risk  /api/telemetry       │
│  /api/anomaly-detect /api/emergency      │
├──────────────────────────────────────────┤
│       Python ML Microservice (FastAPI)   │
│    GradientBoosting · Anomaly Engine     │
├──────────────────────────────────────────┤
│            Supabase (PostgreSQL)          │
│          Auth · Database · Storage       │
└──────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
aeroguardian-ai/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Landing page
│   │   ├── layout.tsx               # Root layout
│   │   ├── globals.css              # Global styles
│   │   ├── login/page.tsx           # Login page
│   │   ├── signup/page.tsx          # Signup page
│   │   ├── dashboard/page.tsx       # Main dashboard
│   │   ├── architecture/page.tsx    # Architecture page
│   │   ├── pricing/page.tsx         # Pricing page
│   │   └── api/
│   │       ├── predict-risk/route.ts
│   │       ├── telemetry/route.ts
│   │       ├── anomaly-detect/route.ts
│   │       └── emergency-recommendation/route.ts
│   ├── components/
│   │   ├── ui/                      # ShadCN UI components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── separator.tsx
│   │   │   └── tabs.tsx
│   │   └── dashboard/               # Dashboard widgets
│   │       ├── risk-score-card.tsx
│   │       ├── telemetry-chart.tsx
│   │       ├── anomaly-panel.tsx
│   │       ├── emergency-panel.tsx
│   │       ├── flight-status-map.tsx
│   │       ├── ai-insights-panel.tsx
│   │       └── stats-card.tsx
│   ├── lib/
│   │   ├── utils.ts                 # Utility functions
│   │   └── supabase.ts              # Supabase client
│   └── services/
│       └── flight-data.ts           # Data simulation engine
├── ml-service/
│   ├── main.py                      # FastAPI ML service
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── Procfile                     # Render deployment
│   └── runtime.txt
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
├── postcss.config.js
├── vercel.json
├── .env.example
└── README.md
```

---

## ⚡ Quick Start

### Prerequisites

- Node.js 18+
- Python 3.11+
- npm or yarn

### 1. Clone & Install Frontend

```bash
git clone <your-repo-url>
cd aeroguardian-ai

npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ML_SERVICE_URL=http://localhost:8000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Setup Supabase

1. Go to [supabase.com](https://supabase.com) and create a free project
2. Go to **Settings → API** and copy your Project URL and anon key
3. Paste them into `.env.local`
4. Enable **Email/Password** auth in **Authentication → Providers**

### 4. Start the Frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Start the ML Service (optional)

```bash
cd ml-service
python -m venv venv
source venv/bin/activate        # macOS/Linux
# venv\Scripts\activate          # Windows

pip install -r requirements.txt
python main.py
```

ML service runs on [http://localhost:8000](http://localhost:8000)

---

## 🌐 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your GitHub repo
4. Set environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `ML_SERVICE_URL` (your Render URL)
5. Click **Deploy**

### ML Service → Render (Free Tier)

1. Go to [render.com](https://render.com) → **New Web Service**
2. Connect your GitHub repo
3. Set:
   - **Root Directory:** `ml-service`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Environment:** Python 3
4. Deploy — copy the URL and set it as `ML_SERVICE_URL` in Vercel

### Alternative: ML Service → Docker

```bash
cd ml-service
docker build -t aeroguardian-ml .
docker run -p 8000:8000 aeroguardian-ml
```

---

## 🔌 API Endpoints

### Next.js API Routes

| Method   | Endpoint                        | Description                   |
| -------- | ------------------------------- | ----------------------------- |
| GET/POST | `/api/predict-risk`             | Get flight risk prediction    |
| GET      | `/api/telemetry`                | Get simulated telemetry data  |
| GET/POST | `/api/anomaly-detect`           | Detect telemetry anomalies    |
| GET/POST | `/api/emergency-recommendation` | Get emergency recommendations |

### Python ML Service

| Method | Endpoint          | Description                   |
| ------ | ----------------- | ----------------------------- |
| GET    | `/`               | Health check                  |
| POST   | `/predict`        | Single flight risk prediction |
| POST   | `/predict/batch`  | Batch predictions             |
| POST   | `/anomaly-detect` | Statistical anomaly detection |
| GET    | `/model-info`     | Model metadata                |

---

## 🧠 ML Model

- **Algorithm:** GradientBoosting Classifier (scikit-learn)
- **Training:** Synthetic aviation telemetry (5,000 samples)
- **Features:** engine_temp, altitude, fuel_usage, weather_risk, vibration
- **Classes:** Low (0-30), Medium (31-60), High (61-100)
- **Auto-trains on first startup** — no external data files needed

---

## 🎨 Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Frontend   | Next.js 14, React, TypeScript  |
| Styling    | TailwindCSS, ShadCN UI         |
| Animations | Framer Motion                  |
| Charts     | Recharts                       |
| Auth       | Supabase Auth                  |
| Database   | Supabase (PostgreSQL)          |
| ML Service | FastAPI, scikit-learn, XGBoost |
| Deployment | Vercel + Render                |

---

## 📄 License

MIT License — free for personal and commercial use.

---

<p align="center">
  Built with ❤️ for aviation safety.<br/>
  <strong>AeroGuardian AI</strong> — Predict. Protect. Prevail.
</p>
