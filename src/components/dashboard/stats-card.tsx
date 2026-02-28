"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export default function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  delay = 0,
}: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
    >
      <Card className="hover:border-white/20 transition-all">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-muted-foreground font-medium">
              {title}
            </span>
            <div className={`p-1.5 rounded-md bg-white/5 ${color}`}>
              <Icon className="h-3.5 w-3.5" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <span className={`text-2xl font-bold ${color}`}>{value}</span>
            {change && (
              <span
                className={`text-xs ${
                  change.startsWith("+")
                    ? "text-neon-green"
                    : change.startsWith("-")
                      ? "text-neon-red"
                      : "text-muted-foreground"
                }`}
              >
                {change}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
