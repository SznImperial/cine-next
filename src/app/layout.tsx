import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UIProvider } from "@/providers/UIProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CineNext — The Ultimate Movie Discovery Platform",
    template: "%s - CineNext",
  },
  description:
    "Explore the latest blockbusters, track your favorite films, and discover hidden gems.",
  keywords: ["Movies", "Cinema", "Next.js", "HeroUI", "Watchlist", "Streaming"],
  authors: [{ name: "lukadevv", url: "https://lukadevv.com" }],
  creator: "lukadevv",
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
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
