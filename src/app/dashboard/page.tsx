"use client";

import AIInsightsPanel from "@/components/dashboard/ai-insights-panel";
import AnomalyPanel from "@/components/dashboard/anomaly-panel";
import EmergencyPanel from "@/components/dashboard/emergency-panel";
import FlightStatusMap from "@/components/dashboard/flight-status-map";
import RiskScoreCard from "@/components/dashboard/risk-score-card";
import StatsCard from "@/components/dashboard/stats-card";
import TelemetryChart from "@/components/dashboard/telemetry-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    detectAnomalies,
    generateFlights,
    getEmergencyRecommendation,
    type AnomalyAlert,
    type EmergencyRecommendation,
    type FlightData,
} from "@/services/flight-data";
import { motion } from "framer-motion";
import {
    Activity,
    AlertTriangle,
    BarChart3,
    Bell,
    ChevronDown,
    Plane,
    RefreshCw,
    Shield,
    Zap,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function DashboardPage() {
  const [flights, setFlights] = useState<FlightData[]>([]);
  const [selectedFlightId, setSelectedFlightId] = useState<string>("");
  const [anomalies, setAnomalies] = useState<AnomalyAlert[]>([]);
  const [emergency, setEmergency] = useState<EmergencyRecommendation | null>(
    null,
  );
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadData = useCallback(() => {
    const newFlights = generateFlights(8);
    setFlights(newFlights);

    if (
      !selectedFlightId ||
      !newFlights.find((f) => f.id === selectedFlightId)
    ) {
      setSelectedFlightId(newFlights[0]?.id || "");
    }
  }, [selectedFlightId]);

  useEffect(() => {
    loadData();
    setLastUpdated(new Date());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const selectedFlight = flights.find((f) => f.id === selectedFlightId);
    if (selectedFlight) {
      const alerts = detectAnomalies(
        selectedFlight.telemetry,
        selectedFlight.flightId,
      );
      setAnomalies(alerts);

      const rec = getEmergencyRecommendation(
        selectedFlight.flightId,
        selectedFlight.riskScore,
        selectedFlight.lat,
        selectedFlight.lng,
      );
      setEmergency(rec);
    }
  }, [selectedFlightId, flights]);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadData();
      setLastUpdated(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, [loadData]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    loadData();
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const selectedFlight = flights.find((f) => f.id === selectedFlightId);
  const totalAnomalies = flights.reduce(
    (sum, f) => sum + detectAnomalies(f.telemetry, f.flightId).length,
    0,
  );
  const emergencyCount = flights.filter((f) => f.status === "emergency").length;
  const avgRisk = flights.length
    ? Math.round(flights.reduce((s, f) => s + f.riskScore, 0) / flights.length)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/90 backdrop-blur-xl">
        <div className="flex h-14 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue to-neon-purple">
                <Shield className="h-4 w-4 text-white" />
              </div>
              <span className="text-sm font-bold hidden sm:inline">
                Aero<span className="text-neon-blue">Guardian</span>
              </span>
            </Link>
            <Badge
              variant="outline"
              className="text-[10px] border-neon-green/30 text-neon-green"
            >
              <Zap className="mr-1 h-2.5 w-2.5" /> LIVE
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground hidden md:inline">
              {lastUpdated
                ? `Updated ${lastUpdated.toLocaleTimeString()}`
                : "Loading..."}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRefresh}
              className="h-8 w-8"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 relative">
              <Bell className="h-3.5 w-3.5" />
              {totalAnomalies > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-neon-red text-[9px] flex items-center justify-center text-white font-bold">
                  {totalAnomalies > 9 ? "9+" : totalAnomalies}
                </span>
              )}
            </Button>
            <div className="h-6 w-px bg-white/10 mx-1 hidden md:block" />
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-1 hidden md:flex text-xs"
            >
              <div className="h-5 w-5 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center text-[10px] font-bold text-white">
                P
              </div>
              Pilot
              <ChevronDown className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="p-4 md:p-6 max-w-[1600px] mx-auto">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-xl md:text-2xl font-bold mb-1">
            Flight Risk Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time AI-powered safety monitoring across {flights.length}{" "}
            active flights
          </p>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Active Flights"
            value={flights.length}
            change="+2 today"
            icon={Plane}
            color="text-neon-blue"
            delay={0}
          />
          <StatsCard
            title="Avg Risk Score"
            value={avgRisk}
            change={avgRisk < 30 ? "-4.2" : "+2.8"}
            icon={BarChart3}
            color={
              avgRisk < 30
                ? "text-neon-green"
                : avgRisk < 60
                  ? "text-yellow-400"
                  : "text-neon-red"
            }
            delay={0.05}
          />
          <StatsCard
            title="Anomalies"
            value={totalAnomalies}
            change={totalAnomalies > 5 ? "+3" : "-1"}
            icon={AlertTriangle}
            color="text-yellow-400"
            delay={0.1}
          />
          <StatsCard
            title="Emergency"
            value={emergencyCount}
            icon={Activity}
            color={emergencyCount > 0 ? "text-neon-red" : "text-neon-green"}
            delay={0.15}
          />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Risk Score */}
            {selectedFlight && (
              <RiskScoreCard
                score={selectedFlight.riskScore}
                flightId={selectedFlight.flightId}
              />
            )}

            {/* Telemetry Chart */}
            {selectedFlight && (
              <TelemetryChart data={selectedFlight.telemetry} />
            )}

            {/* AI Insights + Emergency in 2-col */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedFlight && (
                <AIInsightsPanel
                  riskScore={selectedFlight.riskScore}
                  anomalyCount={anomalies.length}
                  flightId={selectedFlight.flightId}
                />
              )}
              <EmergencyPanel recommendation={emergency} />
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-6">
            {/* Flight Map */}
            <FlightStatusMap
              flights={flights}
              selectedFlight={selectedFlightId}
              onSelectFlight={setSelectedFlightId}
            />

            {/* Anomaly Panel */}
            <AnomalyPanel alerts={anomalies} />
          </div>
        </div>
      </main>
    </div>
  );
}
