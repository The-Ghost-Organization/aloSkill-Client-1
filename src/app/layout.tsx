import type { Metadata } from "next";

import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/session-provider.tsx";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "আলো স্কিল - Start Learning Today",
  description: "Master in-demand skills and discover great books — all in one platform, in Bangla.",
  keywords: ["learning", "education", "bangla", "courses", "books"],
  authors: [{ name: "Alo Skill" }],
  openGraph: {
    title: "আলো স্কিল - Start Learning Today",
    description:
      "Master in-demand skills and discover great books — all in one platform, in Bangla.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`antialiased ${inter.variable} ${playfair.variable}`}
        style={
          {
            "--font-body": "var(--font-inter)",
            "--font-heading": "var(--font-playfair)",
          } as React.CSSProperties
        }
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
