import { randomBetween } from "@/lib/utils";

export interface TelemetryData {
  timestamp: string;
  engine_temp: number;
  fuel_consumption: number;
  altitude: number;
  airspeed: number;
  weather_risk: number;
  vibration: number;
  oil_pressure: number;
  cabin_pressure: number;
}

export interface FlightData {
  id: string;
  flightId: string;
  origin: string;
  destination: string;
  status: "en-route" | "landed" | "delayed" | "emergency";
  riskScore: number;
  altitude: number;
  airspeed: number;
  lat: number;
  lng: number;
  telemetry: TelemetryData[];
}

export interface AnomalyAlert {
  id: string;
  timestamp: string;
  type: "engine_temp" | "altitude" | "fuel" | "vibration" | "weather";
  severity: "warning" | "critical";
  message: string;
  flightId: string;
  value: number;
  threshold: number;
}

export interface EmergencyRecommendation {
  flightId: string;
  riskScore: number;
  nearestAirport: {
    name: string;
    code: string;
    distance: number;
    heading: number;
    runwayLength: number;
  };
  actions: string[];
  estimatedTime: number;
}

const airports = [
  {
    name: "Los Angeles International",
    code: "LAX",
    lat: 33.9425,
    lng: -118.408,
    runwayLength: 12091,
  },
  {
    name: "San Francisco International",
    code: "SFO",
    lat: 37.6213,
    lng: -122.379,
    runwayLength: 11870,
  },
  {
    name: "Denver International",
    code: "DEN",
    lat: 39.8561,
    lng: -104.6737,
    runwayLength: 16000,
  },
  {
    name: "Chicago O'Hare",
    code: "ORD",
    lat: 41.9742,
    lng: -87.9073,
    runwayLength: 13000,
  },
  {
    name: "Dallas/Fort Worth",
    code: "DFW",
    lat: 32.8998,
    lng: -97.0403,
    runwayLength: 13401,
  },
  {
    name: "John F. Kennedy",
    code: "JFK",
    lat: 40.6413,
    lng: -73.7781,
    runwayLength: 14572,
  },
  {
    name: "Seattle-Tacoma",
    code: "SEA",
    lat: 47.4502,
    lng: -122.3088,
    runwayLength: 11901,
  },
  {
    name: "Phoenix Sky Harbor",
    code: "PHX",
    lat: 33.4373,
    lng: -112.0078,
    runwayLength: 11489,
  },
  {
    name: "Miami International",
    code: "MIA",
    lat: 25.7959,
    lng: -80.287,
    runwayLength: 13016,
  },
  {
    name: "Atlanta Hartsfield",
    code: "ATL",
    lat: 33.6407,
    lng: -84.4277,
    runwayLength: 12390,
  },
];

const routes = [
  { origin: "LAX", destination: "JFK" },
  { origin: "SFO", destination: "ORD" },
  { origin: "DEN", destination: "ATL" },
  { origin: "DFW", destination: "SEA" },
  { origin: "MIA", destination: "LAX" },
  { origin: "ORD", destination: "PHX" },
  { origin: "JFK", destination: "SFO" },
  { origin: "ATL", destination: "DEN" },
];

export function generateTelemetryPoint(
  anomaly: boolean = false,
): TelemetryData {
  const now = new Date();
  const base = {
    timestamp: now.toISOString(),
    engine_temp: randomBetween(180, 220),
    fuel_consumption: randomBetween(800, 1200),
    altitude: randomBetween(30000, 42000),
    airspeed: randomBetween(450, 580),
    weather_risk: randomBetween(0, 0.4),
    vibration: randomBetween(0.1, 0.5),
    oil_pressure: randomBetween(60, 90),
    cabin_pressure: randomBetween(6.5, 8.5),
  };

  if (anomaly) {
    const spikeType = Math.floor(Math.random() * 4);
    switch (spikeType) {
      case 0:
        base.engine_temp = randomBetween(280, 350);
        break;
      case 1:
        base.altitude = randomBetween(5000, 15000);
        break;
      case 2:
        base.fuel_consumption = randomBetween(1800, 2500);
        break;
      case 3:
        base.vibration = randomBetween(0.8, 1.5);
        break;
    }
  }

  return base;
}

export function generateTelemetrySeries(
  points: number = 30,
  anomalyRate: number = 0.1,
): TelemetryData[] {
  const data: TelemetryData[] = [];
  const now = Date.now();

  for (let i = 0; i < points; i++) {
    const isAnomaly = Math.random() < anomalyRate;
    const point = generateTelemetryPoint(isAnomaly);
    point.timestamp = new Date(now - (points - i) * 60000).toISOString();
    data.push(point);
  }

  return data;
}

export function generateFlights(count: number = 8): FlightData[] {
  const airlines = ["AG", "QF", "UA", "BA", "LH", "EK", "SQ", "NH"];
  const statuses: FlightData["status"][] = [
    "en-route",
    "en-route",
    "en-route",
    "landed",
    "delayed",
    "en-route",
    "en-route",
    "en-route",
  ];

  return Array.from({ length: count }, (_, i) => {
    const route = routes[i % routes.length];
    const riskScore = Math.round(randomBetween(5, 85));
    return {
      id: `flight-${i}`,
      flightId: `${airlines[i % airlines.length]}${Math.floor(randomBetween(1000, 9999))}`,
      origin: route.origin,
      destination: route.destination,
      status: riskScore > 70 ? "emergency" : statuses[i % statuses.length],
      riskScore,
      altitude: Math.round(randomBetween(28000, 42000)),
      airspeed: Math.round(randomBetween(450, 580)),
      lat: randomBetween(25, 48),
      lng: randomBetween(-120, -75),
      telemetry: generateTelemetrySeries(30, riskScore > 50 ? 0.3 : 0.05),
    };
  });
}

export function detectAnomalies(
  telemetry: TelemetryData[],
  flightId: string,
): AnomalyAlert[] {
  const alerts: AnomalyAlert[] = [];
  const thresholds = {
    engine_temp: 260,
    altitude_low: 20000,
    fuel_consumption: 1600,
    vibration: 0.7,
    weather_risk: 0.7,
  };

  telemetry.forEach((point, idx) => {
    if (point.engine_temp > thresholds.engine_temp) {
      alerts.push({
        id: `alert-eng-${idx}`,
        timestamp: point.timestamp,
        type: "engine_temp",
        severity: point.engine_temp > 300 ? "critical" : "warning",
        message: `Engine temperature spike: ${point.engine_temp.toFixed(0)}°C (threshold: ${thresholds.engine_temp}°C)`,
        flightId,
        value: point.engine_temp,
        threshold: thresholds.engine_temp,
      });
    }
    if (point.altitude < thresholds.altitude_low) {
      alerts.push({
        id: `alert-alt-${idx}`,
        timestamp: point.timestamp,
        type: "altitude",
        severity: point.altitude < 10000 ? "critical" : "warning",
        message: `Unusual altitude drop: ${point.altitude.toFixed(0)}ft (threshold: ${thresholds.altitude_low}ft)`,
        flightId,
        value: point.altitude,
        threshold: thresholds.altitude_low,
      });
    }
    if (point.fuel_consumption > thresholds.fuel_consumption) {
      alerts.push({
        id: `alert-fuel-${idx}`,
        timestamp: point.timestamp,
        type: "fuel",
        severity: point.fuel_consumption > 2000 ? "critical" : "warning",
        message: `Abnormal fuel consumption: ${point.fuel_consumption.toFixed(0)} kg/h (threshold: ${thresholds.fuel_consumption} kg/h)`,
        flightId,
        value: point.fuel_consumption,
        threshold: thresholds.fuel_consumption,
      });
    }
    if (point.vibration > thresholds.vibration) {
      alerts.push({
        id: `alert-vib-${idx}`,
        timestamp: point.timestamp,
        type: "vibration",
        severity: point.vibration > 1.0 ? "critical" : "warning",
        message: `High vibration detected: ${point.vibration.toFixed(2)}g (threshold: ${thresholds.vibration}g)`,
        flightId,
        value: point.vibration,
        threshold: thresholds.vibration,
      });
    }
  });

  return alerts;
}

export function getEmergencyRecommendation(
  flightId: string,
  riskScore: number,
  lat: number,
  lng: number,
): EmergencyRecommendation | null {
  if (riskScore < 60) return null;

  // Find nearest airport
  let nearest = airports[0];
  let minDist = Infinity;

  airports.forEach((airport) => {
    const dist = Math.sqrt(
      Math.pow(airport.lat - lat, 2) + Math.pow(airport.lng - lng, 2),
    );
    if (dist < minDist) {
      minDist = dist;
      nearest = airport;
    }
  });

  const distanceMiles = Math.round(minDist * 60);
  const heading = Math.round(
    (Math.atan2(nearest.lng - lng, nearest.lat - lat) * 180) / Math.PI,
  );

  const actions: string[] = [];
  if (riskScore > 80) {
    actions.push("IMMEDIATE: Declare emergency (MAYDAY)");
    actions.push("Contact ATC for priority landing clearance");
    actions.push(`Divert to ${nearest.code} (${distanceMiles}nm)`);
    actions.push("Reduce altitude to FL200");
    actions.push("Brief cabin crew for emergency procedures");
  } else if (riskScore > 60) {
    actions.push("ADVISORY: Monitor situation closely");
    actions.push(`Nearest diversion: ${nearest.code} (${distanceMiles}nm)`);
    actions.push("Consider precautionary descent");
    actions.push("Review emergency checklists");
  }

  return {
    flightId,
    riskScore,
    nearestAirport: {
      name: nearest.name,
      code: nearest.code,
      distance: distanceMiles,
      heading: ((heading % 360) + 360) % 360,
      runwayLength: nearest.runwayLength,
    },
    actions,
    estimatedTime: Math.round(distanceMiles / 8),
  };
}

export function predictRiskScore(telemetry: TelemetryData): number {
  // Simulated ML prediction - weighted scoring
  let score = 0;

  // Engine temperature contribution
  if (telemetry.engine_temp > 260) score += 25;
  else if (telemetry.engine_temp > 230) score += 15;
  else if (telemetry.engine_temp > 200) score += 5;

  // Altitude contribution
  if (telemetry.altitude < 10000) score += 20;
  else if (telemetry.altitude < 20000) score += 10;

  // Fuel consumption
  if (telemetry.fuel_consumption > 1800) score += 20;
  else if (telemetry.fuel_consumption > 1400) score += 10;

  // Weather risk
  score += telemetry.weather_risk * 20;

  // Vibration
  if (telemetry.vibration > 0.8) score += 15;
  else if (telemetry.vibration > 0.5) score += 5;

  return Math.min(100, Math.max(0, Math.round(score + randomBetween(-5, 5))));
}
