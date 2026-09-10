import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import FloatingCallButton from "@/components/FloatingCallButton";
import { site } from "@/lib/site";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["500", "600", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${site.domain}`),

  title: {
  default: site.brandName,
  template: `%s | ${site.brandName}`,
},

  description:
    "Local appliance repair in Watsonville, CA and the Pajaro Valley. Refrigerators, washers, dryers, dishwashers, ovens and more — same-day service, upfront pricing.",

  keywords: [
    "appliance repair Watsonville CA",
    "refrigerator repair Watsonville",
    "washer repair Watsonville CA",
    "dryer repair Watsonville",
    "dishwasher repair Watsonville CA",
    "oven repair Watsonville",
  ],

  openGraph: {
    title: `${site.brandName} | Same-Day Appliance Repair`,
    description:
      "Local, licensed appliance repair serving Watsonville and the Pajaro Valley. Same-day service, upfront pricing.",
    url: `https://${site.domain}`,
    siteName: site.brandName,
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/images/Favicon/Favicon.png",
    shortcut: "/images/Favicon/Favicon.png",
    apple: "/images/Favicon/Favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-body bg-ink text-paper antialiased">
        <JsonLd />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCallButton />
      </body>
    </html>
  );
}
