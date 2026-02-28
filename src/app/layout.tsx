import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title:
    "AeroGuardian AI – Predictive Aviation Safety & Emergency Intelligence",
  description:
    "AI-powered aviation safety monitoring platform that predicts flight risks, detects anomalies and provides emergency recommendations.",
  keywords: [
    "aviation",
    "safety",
    "AI",
    "flight risk",
    "anomaly detection",
    "emergency",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
