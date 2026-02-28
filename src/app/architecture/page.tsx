"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    AlertTriangle,
    ArrowDown,
    ArrowLeft,
    ArrowRight,
    Brain,
    Cloud,
    Cpu,
    Database,
    GitBranch,
    Globe,
    Layers,
    Lock,
    Monitor,
    Plane,
    Radio,
    Shield,
    Users,
    Zap,
} from "lucide-react";
import Link from "next/link";

function SectionHeader({
  badge,
  title,
  description,
  color,
}: {
  badge: string;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <Badge
        variant="outline"
        className={`mb-4 border-${color}/30 text-${color}`}
      >
        {badge}
      </Badge>
      <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto text-sm">
        {description}
      </p>
    </motion.div>
  );
}

// ─── User Workflow ────────────────────────────────────
function UserWorkflow() {
  const steps = [
    {
      icon: Users,
      title: "Authentication",
      desc: "Users sign up / log in via Supabase Auth with email or OAuth providers.",
      tech: "Supabase Auth",
    },
    {
      icon: Monitor,
      title: "Dashboard Access",
      desc: "Authenticated users access the real-time flight risk monitoring dashboard.",
      tech: "Next.js App Router",
    },
    {
      icon: Radio,
      title: "Data Streaming",
      desc: "Simulated flight telemetry is streamed to the dashboard via API polling.",
      tech: "REST API + Polling",
    },
    {
      icon: Brain,
      title: "AI Predictions",
      desc: "ML models analyze telemetry and return risk scores & anomaly detection results.",
      tech: "FastAPI + XGBoost",
    },
    {
      icon: AlertTriangle,
      title: "Alert & Response",
      desc: "High-risk flights trigger alerts with emergency airport recommendations.",
      tech: "Recommendation Engine",
    },
    {
      icon: Plane,
      title: "Action & Review",
      desc: "Operators review AI insights, approve diversions, and monitor resolution.",
      tech: "Interactive Dashboard",
    },
  ];

  return (
    <section className="py-20">
      <SectionHeader
        badge="User Flow"
        title="User Workflow"
        description="End-to-end journey from authentication to emergency response."
        color="neon-blue"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full hover:border-white/20 transition-all group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-blue/10 text-neon-blue group-hover:bg-neon-blue/20 transition-colors">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-neon-blue/60">
                        STEP {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                      {step.desc}
                    </p>
                    <Badge variant="secondary" className="text-[10px]">
                      {step.tech}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Technical Architecture ───────────────────────────
function TechnicalArchitecture() {
  const layers = [
    {
      name: "Presentation Layer",
      color: "neon-blue",
      items: [
        { name: "Next.js 14 (App Router)", desc: "Server & client rendering" },
        { name: "React + TypeScript", desc: "Type-safe UI components" },
        { name: "TailwindCSS + ShadCN", desc: "Design system" },
        { name: "Framer Motion", desc: "Animations & transitions" },
        { name: "Recharts", desc: "Data visualization" },
      ],
    },
    {
      name: "API Layer",
      color: "neon-purple",
      items: [
        { name: "/api/predict-risk", desc: "AI risk prediction endpoint" },
        { name: "/api/telemetry", desc: "Telemetry data generation" },
        { name: "/api/anomaly-detect", desc: "Anomaly detection pipeline" },
        { name: "/api/emergency-recommendation", desc: "Emergency routing" },
      ],
    },
    {
      name: "AI / ML Engine",
      color: "neon-orange",
      items: [
        { name: "FastAPI Microservice", desc: "Python ML serving" },
        { name: "Scikit-learn", desc: "Model training pipeline" },
        { name: "XGBoost / RandomForest", desc: "Risk prediction models" },
        { name: "Anomaly Detection", desc: "Statistical thresholding" },
      ],
    },
    {
      name: "Data Layer",
      color: "neon-green",
      items: [
        { name: "PostgreSQL (Supabase)", desc: "Persistent data store" },
        { name: "Supabase Auth", desc: "Authentication & user management" },
        { name: "Telemetry Pipeline", desc: "Simulated flight data" },
        { name: "Airport Database", desc: "Emergency diversion data" },
      ],
    },
  ];

  const layerColors: Record<string, string> = {
    "neon-blue": "border-neon-blue/30 bg-neon-blue/5",
    "neon-purple": "border-neon-purple/30 bg-neon-purple/5",
    "neon-orange": "border-neon-orange/30 bg-neon-orange/5",
    "neon-green": "border-neon-green/30 bg-neon-green/5",
  };

  const textColors: Record<string, string> = {
    "neon-blue": "text-neon-blue",
    "neon-purple": "text-neon-purple",
    "neon-orange": "text-neon-orange",
    "neon-green": "text-neon-green",
  };

  return (
    <section className="py-20">
      <SectionHeader
        badge="System Design"
        title="Technical Architecture"
        description="Four-layer architecture with clear separation of concerns and scalable microservice design."
        color="neon-purple"
      />
      <div className="space-y-4">
        {layers.map((layer, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
          >
            <div
              className={`rounded-xl border p-6 ${layerColors[layer.color]}`}
            >
              <div className="flex items-center gap-3 mb-4">
                <Layers className={`h-5 w-5 ${textColors[layer.color]}`} />
                <h3 className={`font-bold ${textColors[layer.color]}`}>
                  {layer.name}
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {layer.items.map((item, j) => (
                  <div key={j} className="glass-card p-3">
                    <p className="text-sm font-medium mb-0.5">{item.name}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="flex justify-center py-2">
                <ArrowDown className="h-5 w-5 text-white/20" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── AI Engine Detail ─────────────────────────────────
function AIEngineDetail() {
  const pipeline = [
    {
      title: "Data Ingestion",
      desc: "Raw telemetry arrives: engine_temp, altitude, fuel_usage, weather_risk, vibration, oil_pressure",
      color: "border-neon-blue/30",
    },
    {
      title: "Feature Engineering",
      desc: "Normalize, compute rolling averages, detect trend changes, calculate rate-of-change features",
      color: "border-neon-purple/30",
    },
    {
      title: "Model Inference",
      desc: "RandomForest ensemble (100 trees) + XGBoost gradient boosting → weighted ensemble prediction",
      color: "border-neon-orange/30",
    },
    {
      title: "Post-processing",
      desc: "Risk classification (Low/Medium/High/Critical), confidence scoring, anomaly flagging",
      color: "border-neon-green/30",
    },
    {
      title: "Action Engine",
      desc: "If risk > threshold → compute nearest airports, generate diversion route, emergency procedures",
      color: "border-neon-red/30",
    },
  ];

  return (
    <section className="py-20">
      <SectionHeader
        badge="ML Pipeline"
        title="AI Engine"
        description="End-to-end machine learning pipeline from raw telemetry to actionable safety recommendations."
        color="neon-orange"
      />
      <div className="max-w-3xl mx-auto space-y-4">
        {pipeline.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full border-2 ${step.color} flex items-center justify-center text-sm font-bold`}
              >
                {i + 1}
              </div>
              {i < pipeline.length - 1 && (
                <div className="w-px h-full bg-white/10 my-1" />
              )}
            </div>
            <Card className="flex-1">
              <CardContent className="p-4">
                <h4 className="font-semibold mb-1">{step.title}</h4>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 glass-card p-6 max-w-3xl mx-auto"
      >
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          <Cpu className="h-4 w-4 text-neon-orange" /> Model Specifications
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { label: "Model Type", value: "RandomForest" },
            { label: "Trees", value: "100" },
            { label: "Features", value: "12" },
            { label: "Latency", value: "<25ms" },
          ].map((spec, i) => (
            <div key={i}>
              <div className="text-lg font-bold text-neon-orange">
                {spec.value}
              </div>
              <div className="text-[10px] text-muted-foreground">
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Infrastructure ───────────────────────────────────
function Infrastructure() {
  const infra = [
    {
      icon: Globe,
      title: "Vercel",
      desc: "Frontend hosting with edge network, automatic CI/CD, and serverless functions.",
      badge: "Frontend",
    },
    {
      icon: Cloud,
      title: "Render",
      desc: "Python ML microservice deployment with auto-scaling and health checks.",
      badge: "ML Service",
    },
    {
      icon: Database,
      title: "Supabase",
      desc: "PostgreSQL database + Auth + Real-time subscriptions on free tier.",
      badge: "Database",
    },
    {
      icon: Lock,
      title: "Security",
      desc: "HTTPS, JWT tokens, row-level security, CORS protection, input validation.",
      badge: "Security",
    },
    {
      icon: GitBranch,
      title: "CI/CD",
      desc: "Git-based deployments, preview environments, automated testing pipeline.",
      badge: "DevOps",
    },
    {
      icon: Zap,
      title: "Performance",
      desc: "Edge caching, server components, streaming SSR, optimized bundle splitting.",
      badge: "Optimization",
    },
  ];

  return (
    <section className="py-20">
      <SectionHeader
        badge="Deployment"
        title="Infrastructure"
        description="Production-ready deployment architecture with zero-cost hosting options."
        color="neon-green"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {infra.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full hover:border-white/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-neon-green/10">
                    <item.icon className="h-5 w-5 text-neon-green" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge variant="outline" className="text-[10px]">
                        {item.badge}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────
export default function ArchitecturePage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold">Architecture</span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="neon" size="sm">
              Dashboard <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge
              variant="outline"
              className="mb-4 border-neon-purple/30 text-neon-purple"
            >
              <Layers className="mr-2 h-3 w-3" /> System Architecture
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Built for <span className="gradient-text">Scale & Safety</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore the complete system architecture powering AeroGuardian AI
              — from user interface to ML inference pipeline.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <UserWorkflow />
        <TechnicalArchitecture />
        <AIEngineDetail />
        <Infrastructure />
      </div>

      {/* Footer CTA */}
      <section className="py-16 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to explore?</h2>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="neon">
                Open Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/">
              <Button variant="neon-outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
