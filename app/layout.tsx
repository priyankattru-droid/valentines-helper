import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
<head>
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&family=Satisfy&family=Dancing+Script:wght@400;700&family=Roboto+Mono:wght@400;500&family=Inter:wght@400;600&display=swap" rel="stylesheet" />
</head>

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
