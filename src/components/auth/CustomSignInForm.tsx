"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import {
  AuthCard,
  AuthError,
  AuthField,
  AuthFooterLink,
  AuthSubmitButton,
} from "@/components/auth/CustomAuthShared";

export function CustomSignInForm() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

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
        <AuthFooterLink
          prompt="Don't have an account?"
          href="/sign-up"
          linkLabel="Create one"
        />
      </form>
    </AuthCard>
  );
}
