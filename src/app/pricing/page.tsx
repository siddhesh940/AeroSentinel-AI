"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, Building2, Check, Rocket, Shield, Zap } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    description: "Perfect for individual pilots and small operations",
    badge: null,
    features: [
      "Up to 5 active flights",
      "Basic risk scoring",
      "Email alerts",
      "7-day data retention",
      "Community support",
    ],
    cta: "Get Started Free",
    variant: "neon-outline" as const,
    icon: Rocket,
    gradient: "from-slate-500 to-slate-400",
  },
  {
    name: "Professional",
    price: "$49",
    period: "per month",
    description: "For flight schools and charter operators",
    badge: "Most Popular",
    features: [
      "Up to 50 active flights",
      "Advanced AI risk prediction",
      "Real-time anomaly detection",
      "Emergency recommendations",
      "30-day data retention",
      "Priority support",
      "API access",
      "Custom dashboards",
    ],
    cta: "Start Free Trial",
    variant: "neon" as const,
    icon: Shield,
    gradient: "from-neon-blue to-neon-purple",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For airlines and large aviation operators",
    badge: null,
    features: [
      "Unlimited active flights",
      "Custom ML model training",
      "Dedicated anomaly engine",
      "Full emergency intelligence",
      "Unlimited data retention",
      "24/7 dedicated support",
      "SSO / SAML",
      "On-premise deployment",
      "SLA guarantee",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    variant: "neon-outline" as const,
    icon: Building2,
    gradient: "from-neon-purple to-neon-orange",
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 hero-gradient pointer-events-none" />
      <div className="fixed inset-0 grid-pattern pointer-events-none opacity-30" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold">
              Aero<span className="text-neon-blue">Guardian</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                Dashboard
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="neon" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-20 pb-12 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge className="mb-4 border-neon-cyan/30 text-neon-cyan bg-neon-cyan/10">
            <Zap className="mr-1 h-3 w-3" />
            Simple, Transparent Pricing
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Choose Your <span className="gradient-text">Safety Plan</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. Every plan includes our core
            AI-powered safety monitoring.
          </p>
        </motion.div>
      </section>

      {/* Plans */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="relative"
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-neon-blue to-neon-purple text-white border-0 px-3 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <Card
                className={`h-full transition-all duration-300 hover:scale-[1.02] ${
                  plan.badge
                    ? "border-neon-blue/30 neon-glow"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="mb-6">
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${plan.gradient} mb-3`}
                    >
                      <plan.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground ml-1 text-sm">
                      /{plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check className="h-4 w-4 text-neon-green mt-0.5 shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant={plan.variant} className="w-full" size="lg">
                    {plan.cta}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Back */}
      <div className="text-center pb-16">
        <Link href="/">
          <Button variant="ghost" size="sm" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
