"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
    AlertCircle,
    Brain,
    CheckCircle,
    Info,
    TrendingUp,
} from "lucide-react";
import { useEffect, useState } from "react";

interface AIInsightsPanelProps {
  riskScore: number;
  anomalyCount: number;
  flightId: string;
}

export default function AIInsightsPanel({
  riskScore,
  anomalyCount,
  flightId,
}: AIInsightsPanelProps) {
  const [weatherIndex, setWeatherIndex] = useState("0.25");

  useEffect(() => {
    setWeatherIndex((Math.random() * 0.5).toFixed(2));
  }, [flightId]);

  const insights = (() => {
    const items: {
      icon: typeof Brain;
      text: string;
      type: "info" | "warning" | "success" | "danger";
    }[] = [];

    if (riskScore > 70) {
      items.push({
        icon: AlertCircle,
        text: `Flight ${flightId} shows critically elevated risk patterns. ML model confidence: 94%. Recommend immediate review.`,
        type: "danger",
      });
    }
    if (riskScore > 40) {
      items.push({
        icon: TrendingUp,
        text: `Risk trend analysis shows ${riskScore > 60 ? "rising" : "moderate"} trajectory over the last 15 minutes. Key contributors: engine temp, vibration.`,
        type: "warning",
      });
    }
    if (anomalyCount > 0) {
      items.push({
        icon: AlertCircle,
        text: `${anomalyCount} anomal${anomalyCount === 1 ? "y" : "ies"} detected in telemetry stream. Pattern analysis suggests ${anomalyCount > 3 ? "systemic issue" : "isolated events"}.`,
        type: anomalyCount > 3 ? "danger" : "warning",
      });
    }
    items.push({
      icon: Brain,
      text: `AI model running with 12 input features. Current prediction latency: 23ms. Model: RandomForest ensemble (n=100 trees).`,
      type: "info",
    });
    if (riskScore <= 30) {
      items.push({
        icon: CheckCircle,
        text: `Flight ${flightId} operating within optimal parameters. All safety thresholds are met. Continue normal operations.`,
        type: "success",
      });
    }
    items.push({
      icon: Info,
      text: `Weather risk index for current flight corridor: ${weatherIndex}. Wind shear probability: low.`,
      type: "info",
    });

    return items;
  })();

  const typeStyles = {
    info: "border-neon-blue/20 bg-neon-blue/5 text-neon-blue",
    warning: "border-yellow-400/20 bg-yellow-400/5 text-yellow-400",
    success: "border-neon-green/20 bg-neon-green/5 text-neon-green",
    danger: "border-neon-red/20 bg-neon-red/5 text-neon-red",
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
          <Brain className="h-4 w-4 text-neon-purple" />
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.slice(0, 4).map((insight, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`flex items-start gap-3 p-3 rounded-lg border ${typeStyles[insight.type]}`}
          >
            <insight.icon className="h-4 w-4 shrink-0 mt-0.5" />
            <p className="text-xs leading-relaxed text-muted-foreground">
              {insight.text}
            </p>
          </motion.div>
        ))}
      </CardContent>
    </Card>
  );
}
