import type { Appearance } from "@clerk/types";

export const clerkAppearance: Appearance = {
  elements: {
    rootBox: "w-full",
    cardBox: "w-full",
    card:
      "w-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,22,38,0.96),rgba(16,18,32,0.98))] shadow-[0_30px_120px_-40px_rgba(92,86,255,0.45)]",
    headerTitle: "text-3xl font-semibold tracking-tight text-white",
    headerSubtitle: "text-sm text-slate-400",
    socialButtonsBlockButton:
      "h-12 rounded-2xl border border-white/10 bg-white/5 text-slate-100 hover:bg-white/10",
    socialButtonsBlockButtonText: "font-medium text-slate-100",
    dividerLine: "bg-white/10",
    dividerText: "text-slate-500",
    formFieldLabel: "text-sm font-medium text-slate-200",
    formFieldInput:
      "h-12 rounded-2xl border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500 focus:border-[hsl(243,60%,68%)] focus:ring-1 focus:ring-[hsl(243,60%,68%)]",
    formButtonPrimary:
      "h-12 rounded-2xl bg-[linear-gradient(135deg,hsl(243,60%,68%),hsl(254,78%,62%))] text-[hsl(230,20%,10%)] shadow-[0_18px_40px_-18px_rgba(101,92,255,0.9)] hover:opacity-95",
    footerActionText: "text-slate-400",
    footerActionLink: "font-medium text-[hsl(243,60%,68%)] hover:text-white",
    identityPreviewText: "text-slate-300",
    identityPreviewEditButton: "text-[hsl(243,60%,68%)] hover:text-white",
    formFieldSuccessText: "text-emerald-400",
    formFieldErrorText: "text-rose-400",
    alertText: "text-rose-300",
    alert: "rounded-2xl border border-rose-500/20 bg-rose-500/10",
    footer: "bg-transparent",
    formResendCodeLink: "text-[hsl(243,60%,68%)] hover:text-white",
    otpCodeFieldInput:
      "rounded-2xl border border-white/10 bg-white/5 text-slate-100",
  },
  variables: {
    colorPrimary: "hsl(243 60% 68%)",
    colorText: "hsl(220 15% 90%)",
    colorTextSecondary: "hsl(220 10% 58%)",
    colorBackground: "rgba(16,18,32,0.96)",
    colorInputBackground: "rgba(255,255,255,0.05)",
    colorInputText: "hsl(220 15% 90%)",
    colorDanger: "hsl(0 72% 62%)",
    borderRadius: "1rem",
  },
};
