"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { EmergencyRecommendation } from "@/services/flight-data";
import { motion } from "framer-motion";
import {
    AlertTriangle,
    ArrowRight,
    Clock,
    MapPin,
    Navigation,
    Plane,
} from "lucide-react";

interface EmergencyPanelProps {
  recommendation: EmergencyRecommendation | null;
}

export default function EmergencyPanel({
  recommendation,
}: EmergencyPanelProps) {
  if (!recommendation) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Emergency Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground">
            <div className="p-3 rounded-full bg-neon-green/10 mb-3">
              <Plane className="h-6 w-6 text-neon-green" />
            </div>
            <p className="text-sm font-medium text-neon-green">All Clear</p>
            <p className="text-xs text-muted-foreground mt-1">
              No emergency actions required
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-neon-red/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-neon-red flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 animate-pulse" />
            Emergency Recommendations
          </CardTitle>
          <Badge variant="destructive" className="animate-pulse">
            ACTIVE
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Flight info */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-neon-red/5 border border-neon-red/20">
          <div>
            <span className="text-xs text-muted-foreground">Flight</span>
            <p className="text-sm font-bold">{recommendation.flightId}</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-muted-foreground">Risk Score</span>
            <p className="text-sm font-bold text-neon-red">
              {recommendation.riskScore}/100
            </p>
          </div>
        </div>

        {/* Nearest Airport */}
        <div className="p-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-neon-blue" />
            <span className="text-xs font-semibold">
              Nearest Diversion Airport
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-lg font-bold text-neon-blue">
                {recommendation.nearestAirport.code}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {recommendation.nearestAirport.name}
              </p>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Navigation className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">
                  {recommendation.nearestAirport.distance}nm / HDG{" "}
                  {recommendation.nearestAirport.heading}°
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">
                  ETA: {recommendation.estimatedTime} min
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Plane className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs">
                  Rwy:{" "}
                  {recommendation.nearestAirport.runwayLength.toLocaleString(
                    "en-US",
                  )}
                  ft
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-muted-foreground">
            Recommended Actions
          </span>
          {recommendation.actions.map((action, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-2 text-xs"
            >
              <ArrowRight className="h-3 w-3 text-neon-red shrink-0 mt-0.5" />
              <span
                className={
                  i === 0
                    ? "text-neon-red font-semibold"
                    : "text-muted-foreground"
                }
              >
                {action}
              </span>
            </motion.div>
          ))}
        </div>

        <Button variant="destructive" size="sm" className="w-full">
          <AlertTriangle className="mr-2 h-4 w-4" />
          Acknowledge & Initiate Diversion
        </Button>
      </CardContent>
    </Card>
  );
}
