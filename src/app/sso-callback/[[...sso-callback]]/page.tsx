"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { BookOpen } from "lucide-react";

export default function SsoCallbackPage() {
  return (
    <>
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,rgba(101,92,255,0.18),transparent_30%),linear-gradient(180deg,rgba(14,16,28,1),rgba(10,11,20,1))]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_0%,rgba(255,255,255,0.02)_50%,transparent_100%)]" />

        <div className="relative flex flex-col items-center gap-5 px-6 text-center">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,22,38,0.96),rgba(16,18,32,0.98))] shadow-[0_30px_120px_-40px_rgba(92,86,255,0.45)] [animation:handbook-breathe_1.8s_ease-in-out_infinite]">
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle,rgba(139,122,232,0.22),transparent_68%)]" />
            <BookOpen className="relative h-8 w-8 text-[hsl(243,60%,68%)]" />
          </div>

          <div className="space-y-1">
            <p className="text-base font-semibold text-white">
              Returning to Interview Handbook
            </p>
            <p className="text-sm text-slate-400">
              Finishing your Google sign-in...
            </p>
          </div>
        </div>
      </div>

      <AuthenticateWithRedirectCallback />
    </>
  );
}
