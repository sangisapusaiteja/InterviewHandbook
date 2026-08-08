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

export function CustomSignUpForm() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleCreateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await signUp(username.trim(), password);
      startTransition(() => {
        router.push("/");
        router.refresh();
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "We couldn't create your account. Please try again."
      );
    }
  };

  return (
    <AuthCard
      title="Create your account in Interview Handbook"
      subtitle="Pick a username and a password to start saving your progress."
    >
      <form className="space-y-5" onSubmit={handleCreateAccount}>
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
          autoComplete="new-password"
          placeholder="Choose a strong password"
          disabled={isPending}
        />
        <AuthField
          label="Confirm password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          disabled={isPending}
        />
        <AuthSubmitButton loading={isPending} disabled={!username || !password || !confirmPassword}>
          Create account
        </AuthSubmitButton>
        <AuthFooterLink
          prompt="Already have an account?"
          href="/sign-in"
          linkLabel="Sign in"
        />
      </form>
    </AuthCard>
  );
}
