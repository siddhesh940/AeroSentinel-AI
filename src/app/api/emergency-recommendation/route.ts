import { randomBetween } from "@/lib/utils";
import { getEmergencyRecommendation } from "@/services/flight-data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const flightId = searchParams.get("flightId") || "AG1234";
  const riskScore = parseInt(searchParams.get("riskScore") || "75");
  const lat = parseFloat(
    searchParams.get("lat") || String(randomBetween(25, 48)),
  );
  const lng = parseFloat(
    searchParams.get("lng") || String(randomBetween(-120, -75)),
  );

  const recommendation = getEmergencyRecommendation(
    flightId,
    riskScore,
    lat,
    lng,
  );

  if (!recommendation) {
    return NextResponse.json({
      success: true,
      data: {
        flightId,
        riskScore,
        status: "no_action_required",
        message: "Risk score below emergency threshold. No diversion needed.",
      },
    });
  }

  return NextResponse.json({
    success: true,
    data: recommendation,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { flightId, riskScore, lat, lng } = body;

    if (!flightId || riskScore === undefined) {
      return NextResponse.json(
        { success: false, error: "flightId and riskScore are required" },
        { status: 400 },
      );
    }

    const recommendation = getEmergencyRecommendation(
      flightId,
      riskScore,
      lat ?? randomBetween(25, 48),
      lng ?? randomBetween(-120, -75),
    );

    return NextResponse.json({
      success: true,
      data: recommendation || {
        flightId,
        riskScore,
        status: "no_action_required",
        message: "Risk score below emergency threshold.",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to generate recommendation" },
      { status: 500 },
    );
  }
}
