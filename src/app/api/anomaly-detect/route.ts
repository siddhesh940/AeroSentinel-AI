import { generateFlightId } from "@/lib/utils";
import {
    detectAnomalies,
    generateTelemetrySeries,
} from "@/services/flight-data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightId = searchParams.get("flightId") || generateFlightId();
  const points = parseInt(searchParams.get("points") || "30");
  const anomalyRate = parseFloat(searchParams.get("anomalyRate") || "0.2");

  const telemetry = generateTelemetrySeries(points, anomalyRate);
  const anomalies = detectAnomalies(telemetry, flightId);

  return NextResponse.json({
    success: true,
    data: {
      flightId,
      totalPoints: telemetry.length,
      anomalyCount: anomalies.length,
      criticalCount: anomalies.filter((a) => a.severity === "critical").length,
      warningCount: anomalies.filter((a) => a.severity === "warning").length,
      anomalies: anomalies.slice(0, 20),
      types: {
        engine_temp: anomalies.filter((a) => a.type === "engine_temp").length,
        altitude: anomalies.filter((a) => a.type === "altitude").length,
        fuel: anomalies.filter((a) => a.type === "fuel").length,
        vibration: anomalies.filter((a) => a.type === "vibration").length,
      },
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { telemetry, flightId } = body;

    if (!telemetry || !Array.isArray(telemetry)) {
      return NextResponse.json(
        { success: false, error: "telemetry array is required" },
        { status: 400 },
      );
    }

    const anomalies = detectAnomalies(telemetry, flightId || "UNKNOWN");

    return NextResponse.json({
      success: true,
      data: {
        anomalyCount: anomalies.length,
        anomalies,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to detect anomalies" },
      { status: 500 },
    );
  }
}
