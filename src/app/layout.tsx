import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import Analytics from "@/components/Analytics";
import RegisterSW from "../components/RegisterSW";
import NewsletterForm from "@/components/NewsletterForm";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: SITE.name,
  description: SITE.description,
  metadataBase: new URL(SITE.url),
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.name,
    description: SITE.description,
  },
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
        <Analytics />
        <RegisterSW />
        <header className="border-b bg-white/70 backdrop-blur dark:bg-black/30">
          <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
            <Link href="/" className="font-semibold hover:opacity-80">{SITE.name}</Link>
            <div className="flex items-center gap-4 text-sm">
              <Link href="/blog" className="hover:underline">Blog</Link>
              <Link href="/about" className="hover:underline">About</Link>
            </div>
          </nav>
        </header>
        <div className="min-h-[calc(100dvh-4rem)]">
          {children}
        </div>
        <div className="mx-auto max-w-4xl px-4 py-8">
          <NewsletterForm />
        </div>
        <footer className="border-t text-center text-sm text-gray-500 dark:text-gray-400">
          <div className="mx-auto max-w-4xl px-4 py-6">© {new Date().getFullYear()} {SITE.name}</div>
        </footer>
      </body>
    </html>
  );
}
