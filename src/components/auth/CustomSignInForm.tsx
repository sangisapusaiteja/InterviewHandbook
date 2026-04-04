"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import {
  AuthCard,
  AuthDivider,
  AuthError,
  AuthField,
  AuthFooterLink,
  AuthSocialButton,
  AuthSubmitButton,
  getClerkErrorMessage,
} from "@/components/auth/CustomAuthShared";

export function CustomSignInForm() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleGoogleSignIn = async () => {
    if (!isLoaded) {
      return;
    }

    setError(null);

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setError(
        getClerkErrorMessage(
          err,
          "Google sign-in could not be started. Please try again."
        )
      );
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    setError(null);

    try {
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status !== "complete") {
        setError("Additional sign-in steps are required for this account.");
        return;
      }

      await setActive({ session: result.createdSessionId });
      startTransition(() => {
        router.push("/");
        router.refresh();
      });
    } catch (err) {
      setError(
        getClerkErrorMessage(err, "We couldn't sign you in. Please try again.")
      );
    }
  };

  return (
    <AuthCard
      title="Welcome back to Interview Handbook"
      subtitle="Sign in with your email and password to continue your prep."
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <AuthError message={error} />
        <AuthSocialButton onClick={handleGoogleSignIn} disabled={!isLoaded || isPending}>
          Continue with Google
        </AuthSocialButton>
        <AuthDivider label="or" />
        <AuthField
          label="Email"
          type="email"
          value={emailAddress}
          onChange={setEmailAddress}
          autoComplete="email"
          placeholder="you@example.com"
          disabled={!isLoaded || isPending}
        />
        <AuthField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
          placeholder="Enter your password"
          disabled={!isLoaded || isPending}
        />
        <AuthSubmitButton loading={isPending} disabled={!isLoaded}>
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
