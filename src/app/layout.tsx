import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AIChatbot from "@/components/ai/AIChatbot";

export const metadata: Metadata = {
  title: "AI Student Room Finder – Find Your Perfect Accommodation",
  description:
    "AI-powered student room finder. Get intelligent room recommendations based on budget, amenities, safety, and lifestyle preferences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <AppProvider>
          <Navbar />
          <main className="flex-1 pt-[64px]">
            {children}
          </main>
          <Footer />
          <AIChatbot />
        </AppProvider>
      </body>
    </html>
  );
}
