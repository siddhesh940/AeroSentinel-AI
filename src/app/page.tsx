"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    Activity,
    AlertTriangle,
    ArrowRight,
    BarChart3,
    Brain,
    Check,
    ChevronRight,
    Cloud,
    Cpu,
    Database,
    Globe,
    Lock,
    Menu,
    Plane,
    Radio,
    Server,
    Shield,
    X,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ─── Navbar ───────────────────────────────────────────
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold">
            Aero<span className="text-neon-blue">Guardian</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#architecture"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Architecture
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="neon" size="sm">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 p-4">
            <Link
              href="#features"
              className="text-sm text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#architecture"
              className="text-sm text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Architecture
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm text-muted-foreground"
              onClick={() => setMobileOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex gap-2 pt-2">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="w-full">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="neon" size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-neon-blue/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-neon-purple/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Badge
            variant="outline"
            className="mb-6 px-4 py-1.5 border-neon-blue/30 text-neon-blue"
          >
            <Zap className="mr-2 h-3 w-3" /> AI-Powered Aviation Safety Platform
          </Badge>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Predict. Protect. <span className="gradient-text">Prevent.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            AeroGuardian AI combines real-time telemetry analysis, machine
            learning risk prediction, and emergency intelligence to keep every
            flight safe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button variant="neon" size="xl">
                Launch Dashboard <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#architecture">
              <Button variant="neon-outline" size="xl">
                View Architecture
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
          <div className="glass-card p-2 neon-glow max-w-5xl mx-auto">
            <div className="rounded-lg bg-background/80 p-4 md:p-6">
              {/* Mock dashboard */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-neon-red/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-neon-green/80" />
                <span className="ml-4 text-xs text-muted-foreground">
                  AeroGuardian AI — Flight Risk Dashboard
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                {[
                  {
                    label: "Active Flights",
                    value: "2,847",
                    color: "text-neon-blue",
                  },
                  {
                    label: "Risk Score Avg",
                    value: "23.4",
                    color: "text-neon-green",
                  },
                  { label: "Anomalies", value: "12", color: "text-yellow-400" },
                  { label: "Emergency", value: "1", color: "text-neon-red" },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-3 text-center">
                    <div
                      className={`text-xl md:text-2xl font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2 glass-card p-4 h-40 flex items-center justify-center">
                  <div className="flex items-end gap-1 h-24">
                    {[
                      35, 42, 28, 55, 38, 62, 45, 30, 48, 55, 40, 32, 50, 45,
                      38, 52, 60, 42, 35, 48,
                    ].map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                        className="w-3 rounded-t bg-gradient-to-t from-neon-blue/60 to-neon-purple/60"
                      />
                    ))}
                  </div>
                </div>
                <div className="glass-card p-4 h-40 flex flex-col justify-center">
                  <div className="text-xs text-muted-foreground mb-2">
                    Risk Gauge
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="relative w-24 h-24">
                      <svg
                        viewBox="0 0 100 100"
                        className="w-full h-full -rotate-90"
                      >
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="40"
                          stroke="url(#gradient)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="251"
                          strokeDashoffset="190"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="gradient">
                            <stop offset="0%" stopColor="#00ff88" />
                            <stop offset="100%" stopColor="#00d4ff" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-neon-green">
                          24
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────
const features = [
  {
    icon: Brain,
    title: "AI Risk Prediction",
    description:
      "XGBoost & RandomForest models analyze real-time telemetry to predict flight risk scores with high accuracy.",
    color: "text-neon-blue",
    glow: "neon-glow",
  },
  {
    icon: Activity,
    title: "Anomaly Detection",
    description:
      "Detect unusual patterns in engine temperature, altitude, fuel consumption and vibration in real-time.",
    color: "text-neon-purple",
    glow: "neon-glow-purple",
  },
  {
    icon: AlertTriangle,
    title: "Emergency Intelligence",
    description:
      "Automatic recommendation of nearest airports, emergency procedures, and optimal diversion routes.",
    color: "text-neon-orange",
    glow: "",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Interactive dashboards with live telemetry visualization, risk gauges, and historical trend analysis.",
    color: "text-neon-green",
    glow: "neon-glow-green",
  },
  {
    icon: Globe,
    title: "Flight Monitoring",
    description:
      "Track multiple flights simultaneously with real-time status updates and geographic positioning.",
    color: "text-neon-cyan",
    glow: "neon-glow",
  },
  {
    icon: Lock,
    title: "Secure Platform",
    description:
      "Enterprise-grade security with Supabase Auth, encrypted data transmission, and role-based access control.",
    color: "text-white",
    glow: "",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-neon-purple/30 text-neon-purple"
          >
            <Cpu className="mr-2 h-3 w-3" /> Core Capabilities
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Intelligent Aviation <span className="gradient-text">Safety</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Six powerful modules working together to predict risks, detect
            anomalies, and ensure every flight arrives safely.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="group hover:border-white/20 transition-all duration-300 h-full">
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex p-3 rounded-xl bg-white/5 ${feature.color}`}
                  >
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-white transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Architecture Preview ─────────────────────────────
function ArchitecturePreview() {
  const layers = [
    {
      title: "Frontend",
      items: ["Next.js 14", "React", "TailwindCSS", "ShadCN UI"],
      icon: Globe,
      color: "from-neon-blue to-neon-cyan",
    },
    {
      title: "Backend API",
      items: [
        "Next.js API Routes",
        "REST Endpoints",
        "Data Pipeline",
        "Auth Middleware",
      ],
      icon: Server,
      color: "from-neon-purple to-neon-blue",
    },
    {
      title: "AI Engine",
      items: ["FastAPI", "Scikit-learn", "XGBoost", "Anomaly Detection"],
      icon: Brain,
      color: "from-neon-orange to-neon-red",
    },
    {
      title: "Data Layer",
      items: ["PostgreSQL", "Supabase", "Real-time Feeds", "Telemetry Store"],
      icon: Database,
      color: "from-neon-green to-neon-cyan",
    },
  ];

  return (
    <section id="architecture" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-neon-green/30 text-neon-green"
          >
            <Server className="mr-2 h-3 w-3" /> System Design
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Modern <span className="gradient-text">Architecture</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Built on a scalable microservice architecture with clear separation
            of concerns.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {layers.map((layer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <Card className="h-full hover:border-white/20 transition-all">
                <CardContent className="p-6">
                  <div
                    className={`mb-4 inline-flex p-3 rounded-xl bg-gradient-to-r ${layer.color} bg-opacity-20`}
                  >
                    <layer.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">{layer.title}</h3>
                  <ul className="space-y-2">
                    {layer.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <ChevronRight className="h-3 w-3 text-neon-blue" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Link href="/architecture">
            <Button variant="neon-outline">
              View Full Architecture <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Data Collection",
      description:
        "Flight telemetry data is continuously collected — engine temp, altitude, fuel consumption, weather conditions, and vibration levels.",
      icon: Radio,
    },
    {
      step: "02",
      title: "AI Analysis",
      description:
        "Our ML engine processes telemetry through RandomForest and XGBoost models to generate real-time risk predictions.",
      icon: Brain,
    },
    {
      step: "03",
      title: "Anomaly Detection",
      description:
        "Statistical models detect unusual spikes in critical parameters and trigger instant alerts to operators.",
      icon: AlertTriangle,
    },
    {
      step: "04",
      title: "Emergency Response",
      description:
        "When risk exceeds thresholds, the system recommends nearest airports, diversion routes, and emergency procedures.",
      icon: Shield,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-neon-blue/30 text-neon-blue"
          >
            <Zap className="mr-2 h-3 w-3" /> Process
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 text-5xl font-bold text-white/5">
                  {step.step}
                </div>
                <div className="mb-4 p-4 rounded-2xl glass-card neon-glow">
                  <step.icon className="h-8 w-8 text-neon-blue" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {i < 3 && (
                <div className="hidden lg:block absolute top-1/3 -right-4 w-8">
                  <ArrowRight className="h-5 w-5 text-white/20" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ──────────────────────────────────────────
function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "/month",
      description: "For evaluation and small operators",
      features: [
        "Up to 10 monitored flights",
        "Basic risk scoring",
        "Email alerts",
        "24h telemetry history",
        "Community support",
      ],
      cta: "Start Free",
      popular: false,
    },
    {
      name: "Professional",
      price: "$299",
      period: "/month",
      description: "For growing airline operators",
      features: [
        "Up to 500 monitored flights",
        "Advanced AI predictions",
        "Real-time anomaly detection",
        "Emergency recommendations",
        "30-day telemetry history",
        "Priority support",
        "API access",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For major airlines and organizations",
      features: [
        "Unlimited flights",
        "Custom ML models",
        "White-label solution",
        "Dedicated infrastructure",
        "Unlimited history",
        "24/7 dedicated support",
        "SLA guarantee",
        "On-premise deployment",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 relative">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 border-neon-cyan/30 text-neon-cyan"
          >
            Pricing
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose the plan that fits your operation. Scale as you grow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className={`h-full relative ${plan.popular ? "border-neon-blue/50 neon-glow" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-neon-blue to-neon-purple text-white border-0">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <Button
                    variant={plan.popular ? "neon" : "neon-outline"}
                    className="w-full mb-6"
                  >
                    {plan.cta}
                  </Button>
                  <ul className="space-y-3">
                    {plan.features.map((feature, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <Check className="h-4 w-4 text-neon-green shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="glass-card neon-glow p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/5 via-neon-purple/5 to-neon-blue/5" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Ready to Secure Your{" "}
              <span className="gradient-text">Flights</span>?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8">
              Join thousands of aviation operators who trust AeroGuardian AI to
              keep their flights safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button variant="neon" size="xl">
                  Launch Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="neon-outline" size="xl">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold">AeroGuardian</span>
            </div>
            <p className="text-xs text-muted-foreground">
              AI-powered aviation safety for the modern world.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Product</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link
                  href="/dashboard"
                  className="hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="#features"
                  className="hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/architecture"
                  className="hover:text-foreground transition-colors"
                >
                  Architecture
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  About
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Blog
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Careers
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Contact
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Privacy
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Terms
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Security
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} AeroGuardian AI. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Cloud className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            <Globe className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
            <Plane className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────
export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <ArchitecturePreview />
      <HowItWorks />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
