import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Pinyon_Script, Playfair_Display, Lora, Parisienne, Great_Vibes } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-serif",
});
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
});

const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });
const names = Parisienne({ subsets: ["latin"], weight: "400", variable: "--font-names" });
const cover = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-cover" });
const body = Lora({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Bhavija & Sibin | Wedding Invitation",
  description: "You are invited to the wedding of Bhavija & Sibin — 11 November 2026.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f7f1e6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${script.variable} ${display.variable} ${body.variable} ${names.variable} ${cover.variable}`}>
      <body>{children}</body>
    </html>
  );
}
