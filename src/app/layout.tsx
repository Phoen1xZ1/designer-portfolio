import type { Metadata } from "next";
import { Be_Vietnam_Pro, JetBrains_Mono } from "next/font/google";

import SmoothScrollProvider from "@/components/animations/smooth-scroll-provider";

import "./globals.css";

const beVietnamBody = Be_Vietnam_Pro({
  variable: "--font-body",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const beVietnamHeading = Be_Vietnam_Pro({
  variable: "--font-heading",
  subsets: ["latin", "vietnamese"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Noirr Portfolio",
    template: "%s | Noirr",
  },
  description:
    "Premium editorial portfolio for Noirr with bilingual storytelling, smooth motion, and refined case-study presentation.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamBody.variable} ${beVietnamHeading.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
