import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CortexHub | Discover Cortensor Apps",
  description: "App Store & Catalog for Cortensor-powered applications. Discover, explore, and try decentralized AI apps built on Cortensor's inference network.",
  keywords: ["Cortensor", "decentralized AI", "app store", "inference", "blockchain", "Web3"],
  openGraph: {
    title: "CortexHub | Discover Cortensor Apps",
    description: "App Store & Catalog for Cortensor-powered applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <Header />
        <main>{children}</main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-20 py-8">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            <p>Built for <span className="text-foreground">Cortensor Hackathon #3</span></p>
            <p className="mt-2">
              <a
                href="https://docs.cortensor.network"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Docs
              </a>
              {" • "}
              <a
                href="https://discord.gg/cortensor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Discord
              </a>
              {" • "}
              <a
                href="https://github.com/cortensor"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
