import type { Metadata } from "next";
import localFont from "next/font/local";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { clerkAppearance } from "@/lib/clerk-theme";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { MobileSidebarProvider } from "@/contexts/MobileSidebarContext";
import { TooltipProvider } from "@/components/ui/tooltip";

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
  const clerkEnabled = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );

  const appShell = (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-[family-name:var(--font-geist-sans)] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <TooltipProvider>
            <MobileSidebarProvider>
              {children}
            </MobileSidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );

  if (!clerkEnabled) {
    return appShell;
  }

  return (
    <ClerkProvider
      appearance={clerkAppearance}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInForceRedirectUrl="/"
      signUpForceRedirectUrl="/"
    >
      {appShell}
    </ClerkProvider>
  );
}
