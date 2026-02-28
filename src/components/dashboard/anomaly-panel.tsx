"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { AnomalyAlert } from "@/services/flight-data";
import { AnimatePresence, motion } from "framer-motion";
import { Activity, AlertTriangle, Flame, Fuel, Mountain } from "lucide-react";

interface AnomalyPanelProps {
  alerts: AnomalyAlert[];
}

const alertIcons = {
  engine_temp: Flame,
  altitude: Mountain,
  fuel: Fuel,
  vibration: Activity,
  weather: AlertTriangle,
};

export default function AnomalyPanel({ alerts }: AnomalyPanelProps) {
  const sorted = [...alerts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Anomaly Detection
          </CardTitle>
          <Badge
            variant={
              alerts.some((a) => a.severity === "critical")
                ? "destructive"
                : "warning"
            }
          >
            {alerts.length} alert{alerts.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4">
          <AnimatePresence>
            {sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-[250px] text-muted-foreground">
                <AlertTriangle className="h-8 w-8 mb-2 opacity-30" />
                <p className="text-sm">No anomalies detected</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sorted.slice(0, 10).map((alert, i) => {
                  const Icon = alertIcons[alert.type] || AlertTriangle;
                  return (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`flex items-start gap-3 p-3 rounded-lg border ${
                        alert.severity === "critical"
                          ? "border-neon-red/20 bg-neon-red/5"
                          : "border-yellow-400/20 bg-yellow-400/5"
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-md ${
                          alert.severity === "critical"
                            ? "bg-neon-red/20"
                            : "bg-yellow-400/20"
                        }`}
                      >
                        <Icon
                          className={`h-4 w-4 ${
                            alert.severity === "critical"
                              ? "text-neon-red"
                              : "text-yellow-400"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-semibold">
                            {alert.flightId}
                          </span>
                          <Badge
                            variant={
                              alert.severity === "critical"
                                ? "destructive"
                                : "warning"
                            }
                            className="text-[10px] px-1.5 py-0"
                          >
                            {alert.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {alert.message}
                        </p>
                        <p
                          className="text-[10px] text-muted-foreground/60 mt-1"
                          suppressHydrationWarning
                        >
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
