import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { MiniPlayer } from "@/components/player/mini-player";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MusicNotes - Social Music Curation Platform",
  description: "Discover and share music with a social token economy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-foreground antialiased min-h-screen`}>
        <Navbar />
        
        <main className="md:ml-64 lg:ml-72 pt-14 md:pt-0 pb-20">
          {children}
        </main>
        
        <MiniPlayer />
      </body>
    </html>
  );
}
