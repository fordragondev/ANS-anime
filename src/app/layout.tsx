import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { DesignProvider } from "@/components/DesignProvider";
import { HeaderToggle } from "@/components/HeaderToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Anime News - Latest Anime Updates",
  description: "Stay updated with the latest anime news, releases, and updates from Anime News Network. Inspired on KSL.com site UI design.",
  keywords: ["anime", "news", "manga", "updates", "releases"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <ThemeProvider>
          <DesignProvider>
            <HeaderToggle />
            {children}
          </DesignProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
