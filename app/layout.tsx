import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Panini WK 2026 Tracker",
  description: "Beheer je dubbele Panini stickers voor het WK voetbal 2026.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
