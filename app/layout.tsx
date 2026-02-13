import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Satisfy, Dancing_Script, Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const satisfy = Satisfy({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-satisfy",
});

const dancingScript = Dancing_Script({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-dancing",
});

const sourceSerif = Source_Serif_4({
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-source-serif",
});

const inter = Inter({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Valentine's Helper",
  description: "Create heartfelt Valentine's Day letters",
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${satisfy.variable} ${dancingScript.variable} ${sourceSerif.variable} ${inter.variable} antialiased`}>
  {children}
</body>
    </html>
  );
}
