"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getRiskLevel } from "@/lib/utils";
import type { FlightData } from "@/services/flight-data";
import { motion } from "framer-motion";
import { ArrowRight, Plane } from "lucide-react";

interface FlightStatusMapProps {
  flights: FlightData[];
  selectedFlight: string;
  onSelectFlight: (id: string) => void;
}

export default function FlightStatusMap({
  flights,
  selectedFlight,
  onSelectFlight,
}: FlightStatusMapProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Flight Status Monitor
          </CardTitle>
          <Badge variant="outline">{flights.length} flights</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {/* Mini Map visualization */}
        <div className="relative h-48 rounded-lg bg-white/5 border border-white/10 mb-4 overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          {/* Simple map representation */}
          {flights.map((flight, i) => {
            const risk = getRiskLevel(flight.riskScore);
            const x = ((flight.lng + 120) / 50) * 100;
            const y = ((48 - flight.lat) / 25) * 100;
            return (
              <motion.button
                key={flight.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectFlight(flight.id)}
                className={`absolute group ${
                  selectedFlight === flight.id ? "z-20" : "z-10"
                }`}
                style={
                  {
                    left: `${Math.min(90, Math.max(5, x))}%`,
                    top: `${Math.min(85, Math.max(5, y))}%`,
                  } as React.CSSProperties
                }
              >
                <div
                  className={`relative ${selectedFlight === flight.id ? "scale-125" : ""} transition-transform`}
                >
                  <Plane
                    className={`h-4 w-4 ${risk.color} ${
                      flight.status === "emergency" ? "animate-pulse" : ""
                    }`}
                  />
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="glass-card px-2 py-1 text-[10px] whitespace-nowrap">
                      {flight.flightId}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
          {/* Map labels */}
          <div className="absolute bottom-2 left-2 text-[10px] text-muted-foreground/50">
            US Airspace
          </div>
        </div>

        {/* Flight List */}
        <ScrollArea className="h-[250px]">
          <div className="space-y-2">
            {flights.map((flight, i) => {
              const risk = getRiskLevel(flight.riskScore);
              return (
                <motion.button
                  key={flight.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => onSelectFlight(flight.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                    selectedFlight === flight.id
                      ? "border-neon-blue/30 bg-neon-blue/5"
                      : "border-white/5 bg-white/[0.02] hover:bg-white/5"
                  }`}
                >
                  <div className={`p-1.5 rounded-md ${risk.bgColor}`}>
                    <Plane className={`h-3 w-3 ${risk.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">
                        {flight.flightId}
                      </span>
                      <Badge
                        variant={
                          flight.status === "emergency"
                            ? "destructive"
                            : flight.status === "delayed"
                              ? "warning"
                              : "success"
                        }
                        className="text-[10px] px-1.5 py-0"
                      >
                        {flight.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-muted-foreground mt-0.5">
                      <span>{flight.origin}</span>
                      <ArrowRight className="h-2 w-2" />
                      <span>{flight.destination}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${risk.color}`}>
                      {flight.riskScore}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      risk
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
