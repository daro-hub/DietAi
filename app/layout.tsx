import type React from "react"
import type { Metadata, Viewport } from "next"
import { DM_Sans, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-context"
import { FavoritesProvider } from "@/components/favorites/favorites-context"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["700"],
})

export const metadata: Metadata = {
  title: "DietAI - Personalized Nutrition Made Simple",
  description:
    "Generate personalized diet plans with AI. Track your nutrition, save favorites, and discover healthy recipes.",
  generator: "DietAI",
  manifest: "/manifest.json",
  keywords: ["diet", "nutrition", "AI", "health", "fitness", "meal planning"],
  authors: [{ name: "DietAI Team" }],
  creator: "DietAI",
  publisher: "DietAI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://dietai.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DietAI - Personalized Nutrition Made Simple",
    description:
      "Generate personalized diet plans with AI. Track your nutrition, save favorites, and discover healthy recipes.",
    url: "https://dietai.app",
    siteName: "DietAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DietAI - Personalized Nutrition Made Simple",
    description:
      "Generate personalized diet plans with AI. Track your nutrition, save favorites, and discover healthy recipes.",
    creator: "@dietai",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-token",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0891b2" },
    { media: "(prefers-color-scheme: dark)", color: "#0891b2" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.jpg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#0891b2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="DietAI" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#0891b2" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <FavoritesProvider>
            <Suspense fallback={null}>{children}</Suspense>
          </FavoritesProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
