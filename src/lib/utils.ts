import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat("en-US").format(num);
}

export function getRiskLevel(score: number): {
  level: "Low" | "Medium" | "High" | "Critical";
  color: string;
  bgColor: string;
} {
  if (score <= 25)
    return {
      level: "Low",
      color: "text-neon-green",
      bgColor: "bg-neon-green/10",
    };
  if (score <= 50)
    return {
      level: "Medium",
      color: "text-yellow-400",
      bgColor: "bg-yellow-400/10",
    };
  if (score <= 75)
    return {
      level: "High",
      color: "text-neon-orange",
      bgColor: "bg-neon-orange/10",
    };
  return {
    level: "Critical",
    color: "text-neon-red",
    bgColor: "bg-neon-red/10",
  };
}

export function generateFlightId(): string {
  const airlines = ["AG", "QF", "UA", "BA", "LH", "EK", "SQ", "NH"];
  const airline = airlines[Math.floor(Math.random() * airlines.length)];
  const num = Math.floor(Math.random() * 9000) + 1000;
  return `${airline}${num}`;
}

export function randomBetween(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}
