import {
    generateTelemetryPoint,
    generateTelemetrySeries,
} from "@/services/flight-data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const points = parseInt(searchParams.get("points") || "30");
  const anomalyRate = parseFloat(searchParams.get("anomalyRate") || "0.1");

  const telemetry = generateTelemetrySeries(
    Math.min(points, 100),
    Math.min(anomalyRate, 0.5),
  );

  return NextResponse.json({
    success: true,
    data: {
      points: telemetry.length,
      anomalyRate,
      telemetry,
      latest: telemetry[telemetry.length - 1],
    },
  });
}

export async function POST() {
  // Generate a single real-time telemetry point
  const point = generateTelemetryPoint(Math.random() < 0.15);

  return NextResponse.json({
    success: true,
    data: point,
  });
}
