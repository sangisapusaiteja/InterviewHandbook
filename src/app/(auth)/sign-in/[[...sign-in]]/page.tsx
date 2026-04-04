import { AuthShell } from "@/components/auth/AuthShell";
import { CustomSignInForm } from "@/components/auth/CustomSignInForm";

export default function SignInPage() {
  const clerkEnabled = Boolean(
    process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.CLERK_SECRET_KEY
  );

  return (
    <AuthShell
      title="Sign in and continue your prep"
      description="Jump back into your handbook, unlock AJet, and keep your interview prep in one focused workspace."
    >
      {clerkEnabled ? (
        <CustomSignInForm />
      ) : (
        <div className="w-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,22,38,0.96),rgba(16,18,32,0.98))] p-6 text-slate-200 shadow-[0_30px_120px_-40px_rgba(92,86,255,0.45)] sm:p-8">
          Clerk authentication is not configured for this environment.
        </div>
      )}
    </AuthShell>
  );
}
