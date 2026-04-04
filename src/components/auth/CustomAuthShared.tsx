"use client";

import { useState } from "react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function AuthCard({
  title,
  subtitle,
  children,
}: Readonly<{
  title: string;
  subtitle: string;
  children: ReactNode;
}>) {
  return (
    <div className="w-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,22,38,0.96),rgba(16,18,32,0.98))] p-6 shadow-[0_30px_120px_-40px_rgba(92,86,255,0.45)] sm:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold tracking-tight text-white">
          {title}
        </h2>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
      </div>
      {children}
    </div>
  );
}

export function AuthField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  disabled,
  inputMode,
  maxLength,
}: Readonly<{
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  maxLength?: number;
}>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const resolvedType = isPasswordField && showPassword ? "text" : type;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-slate-200">{label}</span>
      <div className="relative">
        <input
          type={resolvedType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          inputMode={inputMode}
          maxLength={maxLength}
          className={cn(
            "h-12 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-slate-100 outline-none transition focus:border-[hsl(243,60%,68%)] focus:ring-1 focus:ring-[hsl(243,60%,68%)] placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-60",
            isPasswordField && "pr-12"
          )}
        />
        {isPasswordField ? (
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-slate-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        ) : null}
      </div>
    </label>
  );
}

export function AuthSubmitButton({
  children,
  loading,
  disabled,
}: Readonly<{
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}>) {
  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={cn(
        "flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[linear-gradient(135deg,hsl(243,60%,68%),hsl(254,78%,62%))] px-4 text-sm font-semibold text-[hsl(230,20%,10%)] shadow-[0_18px_40px_-18px_rgba(101,92,255,0.9)] transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
      )}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
      <span>{children}</span>
    </button>
  );
}

export function AuthSocialButton({
  children,
  onClick,
  disabled,
}: Readonly<{
  children: ReactNode;
  onClick: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  disabled?: boolean;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-slate-100 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <GoogleIcon className="h-4 w-4" />
      <span>{children}</span>
    </button>
  );
}

export function AuthDivider({
  label,
}: Readonly<{
  label: string;
}>) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
        {label}
      </span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

export function AuthError({
  message,
}: Readonly<{
  message: string | null;
}>) {
  if (!message) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">
      {message}
    </div>
  );
}

export function AuthFooterLink({
  prompt,
  href,
  linkLabel,
}: Readonly<{
  prompt: string;
  href: string;
  linkLabel: string;
}>) {
  return (
    <p className="text-sm text-slate-400">
      {prompt}{" "}
      <Link
        href={href}
        className="font-medium text-[hsl(243,60%,68%)] transition hover:text-white"
      >
        {linkLabel}
      </Link>
    </p>
  );
}

export function getClerkErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "errors" in error &&
    Array.isArray((error as { errors?: unknown[] }).errors)
  ) {
    const messages = (error as { errors: Array<{ longMessage?: string; message?: string }> }).errors
      .map((issue) => issue.longMessage || issue.message)
      .filter(Boolean);

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return fallback;
}

function GoogleIcon({ className }: Readonly<{ className?: string }>) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.6 14.6 2.7 12 2.7 6.9 2.7 2.8 6.8 2.8 12S6.9 21.3 12 21.3c6.1 0 9.1-4.3 9.1-6.5 0-.4 0-.8-.1-1.1H12Z"
      />
      <path
        fill="#34A853"
        d="M2.8 7.3l3.2 2.3C6.8 7.9 9.1 6 12 6c1.8 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.6 14.6 2.7 12 2.7c-3.6 0-6.8 2.1-8.3 4.6Z"
      />
      <path
        fill="#FBBC05"
        d="M12 21.3c2.5 0 4.7-.8 6.3-2.3l-2.9-2.4c-.8.6-1.9 1.1-3.4 1.1-3.9 0-5.1-2.6-5.4-3.8l-3.2 2.4c1.5 2.9 4.5 5 8.6 5Z"
      />
      <path
        fill="#4285F4"
        d="M21.1 13.7c.1-.3.2-.8.2-1.3s-.1-1-.2-1.3H12v3.9h5.4c-.3 1.2-1.2 2.2-2 2.8l2.9 2.4c1.7-1.6 2.8-3.9 2.8-6.5Z"
      />
    </svg>
  );
}
