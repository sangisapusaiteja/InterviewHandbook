import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import { MobileSidebarProvider } from "@/contexts/MobileSidebarContext";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RouteProgressBar } from "@/components/layout/RouteProgressBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Interview Handbook",
  description:
    "A comprehensive, beginner-friendly interview preparation handbook for software developers. Master DSA, JavaScript, and more.",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <AuthProvider>
          <PreferencesProvider>
            <ThemeProvider attribute="class" defaultTheme="read" enableSystem={false}>
              <TooltipProvider>
                <MobileSidebarProvider>{children}</MobileSidebarProvider>
              </TooltipProvider>
            </ThemeProvider>
          </PreferencesProvider>
        </AuthProvider>
        <RouteProgressBar />
      </body>
    </html>
  );
}
