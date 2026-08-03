"use client";

import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useSignUp } from "@clerk/nextjs";
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

export function CustomSignUpForm() {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleGoogleSignUp = async () => {
    if (!isLoaded) {
      return;
    }

    setError(null);

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err) {
      setError(
        getClerkErrorMessage(
          err,
          "Google sign-up could not be started. Please try again."
        )
      );
    }
  };

  const handleCreateAccount = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    setError(null);
    setIsCreatingAccount(true);

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setPendingVerification(true);
    } catch (err) {
      setError(
        getClerkErrorMessage(
          err,
          "We couldn't create your account. Please try again."
        )
      );
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handleVerifyEmail = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoaded) {
      return;
    }

    setError(null);

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status !== "complete") {
        setError("Your verification code is not complete yet. Please try again.");
        return;
      }

      await setActive({ session: result.createdSessionId });
      startTransition(() => {
        router.push("/");
        router.refresh();
      });
    } catch (err) {
      setError(
        getClerkErrorMessage(
          err,
          "We couldn't verify that code. Please try again."
        )
      );
    }
  };

  return (
    <AuthCard
      title={pendingVerification ? "Verify your email" : "Create your account In Interview Handbook"}
      subtitle={
        pendingVerification
          ? `Enter the code sent to ${emailAddress}.`
          : "Use your email and a password to start saving your progress."
      }
    >
      {pendingVerification ? (
        <form className="space-y-5" onSubmit={handleVerifyEmail}>
          <AuthError message={error} />
          <AuthField
            label="Verification code"
            value={code}
            onChange={setCode}
            inputMode="numeric"
            maxLength={6}
            placeholder="123456"
            disabled={!isLoaded || isPending}
          />
          <AuthSubmitButton loading={isPending} disabled={!isLoaded}>
            Verify and continue
          </AuthSubmitButton>
          <button
            type="button"
            onClick={() => {
              setPendingVerification(false);
              setCode("");
              setError(null);
            }}
            className="w-full text-sm font-medium text-slate-400 transition hover:text-white"
          >
            Change email or password
          </button>
          <AuthFooterLink
            prompt="Already have an account?"
            href="/sign-in"
            linkLabel="Sign in"
          />
        </form>
      ) : (
        <form className="space-y-5" onSubmit={handleCreateAccount}>
          <AuthError message={error} />
          <AuthSocialButton
            onClick={handleGoogleSignUp}
            disabled={!isLoaded || isPending || isCreatingAccount}
          >
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
            disabled={!isLoaded || isPending || isCreatingAccount}
          />
          <AuthField
            label="Password"
            type="password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            placeholder="Choose a strong password"
            disabled={!isLoaded || isPending || isCreatingAccount}
          />
          <AuthSubmitButton
            loading={isPending || isCreatingAccount}
            disabled={!isLoaded}
          >
            Create account
          </AuthSubmitButton>
          {isCreatingAccount ? (
            <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Creating your account and sending verification code...</span>
            </div>
          ) : null}
          <AuthFooterLink
            prompt="Already have an account?"
            href="/sign-in"
            linkLabel="Sign in"
          />
        </form>
      )}
    </AuthCard>
  );
}
