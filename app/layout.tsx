import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Platewise — Your dietician, in your camera roll.",
  description:
    "Snap your plate. See macros, calories, and nutrient gaps. Get a friendlier suggestion for tomorrow.",
  openGraph: {
    title: "Platewise — Your dietician, in your camera roll.",
    description:
      "Snap your plate. See macros, calories, and nutrient gaps. Get a friendlier suggestion for tomorrow.",
    images: [
      {
        url: "https://waitlist-api-sigma.vercel.app/api/og?title=Platewise&accent=emerald&category=Health",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://waitlist-api-sigma.vercel.app/api/og?title=Platewise&accent=emerald&category=Health",
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
