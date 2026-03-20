import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Lucky Strips Fly Co. | Smith River Fly Fishing Guide - Virginia",
  description: "Experience world-class fly fishing on Virginia's Smith River with Lucky Strips Fly Co. Expert guided trips for all skill levels. Book your adventure today!",
  keywords: "fly fishing, Smith River, Virginia, guided trips, trout fishing, fly fishing guide, Bassett VA",
  openGraph: {
    title: "Lucky Strips Fly Co. | Smith River Fly Fishing Guide",
    description: "Experience world-class fly fishing on Virginia's Smith River with expert guided trips.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
