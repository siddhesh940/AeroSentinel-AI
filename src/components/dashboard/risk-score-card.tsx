"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRiskLevel } from "@/lib/utils";
import { motion } from "framer-motion";

interface RiskScoreCardProps {
  score: number;
  flightId: string;
}

export default function RiskScoreCard({ score, flightId }: RiskScoreCardProps) {
  const risk = getRiskLevel(score);
  const circumference = 2 * Math.PI * 45;
  const dashOffset = circumference - (score / 100) * circumference;

  const getGradientColors = () => {
    if (score <= 25) return { start: "#00ff88", end: "#06b6d4" };
    if (score <= 50) return { start: "#facc15", end: "#ff6b35" };
    if (score <= 75) return { start: "#ff6b35", end: "#ff3366" };
    return { start: "#ff3366", end: "#dc2626" };
  };

  const colors = getGradientColors();

  return (
    <Card className="relative overflow-hidden">
      <div className={`absolute inset-0 ${risk.bgColor} opacity-30`} />
      <CardHeader className="pb-2 relative">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Risk Score — {flightId}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="flex items-center gap-6">
          <div className="relative w-28 h-28 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="8"
                fill="none"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke={`url(#riskGrad-${flightId})`}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: dashOffset }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id={`riskGrad-${flightId}`}>
                  <stop offset="0%" stopColor={colors.start} />
                  <stop offset="100%" stopColor={colors.end} />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                className={`text-3xl font-bold ${risk.color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {score}
              </motion.span>
              <span className="text-[10px] text-muted-foreground">/ 100</span>
            </div>
          </div>
          <div>
            <div className={`text-2xl font-bold ${risk.color} mb-1`}>
              {risk.level}
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {score <= 25 &&
                "All parameters within normal range. Flight conditions are optimal."}
              {score > 25 &&
                score <= 50 &&
                "Minor deviations detected. Continue monitoring."}
              {score > 50 &&
                score <= 75 &&
                "Significant risk factors detected. Increased monitoring required."}
              {score > 75 &&
                "Critical risk level. Immediate action recommended."}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
