"use client";

import { FormEvent, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  AuthCard,
  AuthError,
  AuthField,
  AuthFooterLink,
  AuthSubmitButton,
} from "@/components/auth/CustomAuthShared";

const googleErrors: Record<string, string> = {
  google_unavailable: "Google sign-in is not configured yet. Use username & password for now.",
  google_failed: "Google sign-in failed. Please try again.",
};

export function CustomSignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Surface errors passed back by the Google OAuth callback (?error=...).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlError = params.get("error");
    if (urlError && googleErrors[urlError]) {
      setError(googleErrors[urlError]);
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await signIn(username.trim(), password);
      startTransition(() => {
        router.push("/");
        router.refresh();
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "We couldn't sign you in. Please try again."
      );
    }
  };

  return (
    <AuthCard
      title="Welcome back to Interview Handbook"
      subtitle="Sign in with your username and password to continue your prep."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthError message={error} />
        <AuthField
          label="Username"
          type="text"
          value={username}
          onChange={setUsername}
          autoComplete="username"
          placeholder="your_username"
          disabled={isPending}
        />
        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          placeholder="Enter your password"
          disabled={isPending}
        />
        <AuthSubmitButton loading={isPending} disabled={!username || !password}>
          Sign in
        </AuthSubmitButton>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">or</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google */}
        <a
          href="/api/auth/google"
          className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-border bg-muted/40 px-4 text-sm font-semibold text-foreground transition hover:bg-muted"
        >
          <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4">
            <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.6 14.6 2.7 12 2.7 6.9 2.7 2.8 6.8 2.8 12S6.9 21.3 12 21.3c6.1 0 9.1-4.3 9.1-6.5 0-.4 0-.8-.1-1.1H12Z" />
            <path fill="#34A853" d="M2.8 7.3l3.2 2.3C6.8 7.9 9.1 6 12 6c1.8 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.6 14.6 2.7 12 2.7c-3.6 0-6.8 2.1-8.3 4.6Z" />
            <path fill="#FBBC05" d="M12 21.3c2.5 0 4.7-.8 6.3-2.3l-2.9-2.4c-.8.6-1.9 1.1-3.4 1.1-3.9 0-5.1-2.6-5.4-3.8l-3.2 2.4c1.5 2.9 4.5 5 8.6 5Z" />
            <path fill="#4285F4" d="M21.1 13.7c.1-.3.2-.8.2-1.3s-.1-1-.2-1.3H12v3.9h5.4c-.3 1.2-1.2 2.2-2 2.8l2.9 2.4c1.7-1.6 2.8-3.9 2.8-6.5Z" />
          </svg>
          Continue with Google
        </a>

        <AuthFooterLink
          prompt="Don't have an account?"
          href="/sign-up"
          linkLabel="Create one"
        />
      </form>
    </AuthCard>
  );
}
