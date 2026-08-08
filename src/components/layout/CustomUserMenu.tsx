"use client";

import { FormEvent, useMemo, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BarChart3,
  ChevronRight,
  Eye,
  EyeOff,
  LogOut,
  Shield,
  Trash2,
  UserCircle2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AuthError,
  AuthSubmitButton,
} from "@/components/auth/CustomAuthShared";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";

type AccountTab = "profile" | "security";

export function CustomUserMenu() {
  const { user, isLoaded, signOut } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const initials = useMemo(
    () => getInitials(user?.username),
    [user?.username]
  );

  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
    router.refresh();
  };

  const confirmDeleteAccount = async () => {
    setDeleteError(null);
    setIsDeleting(true);

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Failed to delete account.");
      }

      await signOut();
      router.push("/sign-up");
      router.refresh();
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete account."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isLoaded || !user) {
    return null;
  }

  return (
    <>
      <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            aria-label="Open account menu"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-background transition hover:border-primary/30 hover:bg-muted/50"
          >
            <span className="text-xs font-semibold text-foreground">
              {initials}
            </span>
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={10}
            align="end"
            className="z-[95] w-[320px] rounded-[28px] border border-border/70 bg-background/95 p-3 text-foreground shadow-2xl backdrop-blur-xl"
          >
            <div className="rounded-3xl border border-border/70 bg-card/70 p-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-muted/40">
                  <span className="text-sm font-semibold text-foreground">
                    {initials}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.username}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    Interview Handbook member
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1">
              <MenuButton
                icon={<BarChart3 className="h-4 w-4" />}
                label="Progress"
                onClick={() => {
                  setMenuOpen(false);
                  router.push("/progress");
                }}
              />
              <MenuButton
                icon={<UserCircle2 className="h-4 w-4" />}
                label="Profile"
                onClick={() => {
                  setActiveTab("profile");
                  setAccountOpen(true);
                  setMenuOpen(false);
                }}
              />
              <MenuButton
                icon={<Shield className="h-4 w-4" />}
                label="Security"
                onClick={() => {
                  setActiveTab("security");
                  setAccountOpen(true);
                  setMenuOpen(false);
                }}
              />
              <MenuButton
                icon={<LogOut className="h-4 w-4" />}
                label="Sign out"
                onClick={() => void handleSignOut()}
              />
            </div>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      <Dialog open={accountOpen} onOpenChange={setAccountOpen}>
        <DialogContent className="flex h-[min(86vh,760px)] min-h-0 w-[min(96vw,980px)] max-h-[calc(100vh-1rem)] max-w-[980px] flex-col overflow-hidden rounded-[24px] border border-border/70 bg-background/95 p-0 text-foreground shadow-2xl backdrop-blur-xl sm:max-h-[calc(100vh-2rem)] sm:rounded-[30px]">
          <DialogHeader className="sr-only">
            <DialogTitle>Account</DialogTitle>
            <DialogDescription>
              Manage your Interview Handbook account details and security.
            </DialogDescription>
          </DialogHeader>

          <div className="grid h-full min-h-0 grid-rows-[auto_1fr] rounded-[20px] bg-background/95 md:grid-cols-[230px_1fr] md:grid-rows-1 md:rounded-none md:bg-transparent">
            <aside className="border-b border-border/70 bg-muted/20 p-4 md:min-h-0 md:border-b-0 md:border-r md:p-6">
              <div>
                <h2 className="text-[1.75rem] font-semibold tracking-tight text-foreground md:text-[1.9rem]">
                  Account
                </h2>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Manage your account info.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2 md:mt-8 md:flex md:flex-col md:overflow-visible md:pb-0">
                <SidebarTab
                  active={activeTab === "profile"}
                  icon={<UserCircle2 className="h-4 w-4" />}
                  label="Profile"
                  onClick={() => setActiveTab("profile")}
                />
                <SidebarTab
                  active={activeTab === "security"}
                  icon={<Shield className="h-4 w-4" />}
                  label="Security"
                  onClick={() => setActiveTab("security")}
                />
              </div>
            </aside>

            <section className="relative h-full min-h-0 overflow-y-auto overscroll-contain px-5 pb-5 pt-5 md:p-7">
              {activeTab === "profile" ? (
                <ProfilePanel username={user.username} initials={initials} />
              ) : (
                <SecurityPanel
                  onRequestDeleteAccount={() => setDeleteDialogOpen(true)}
                  isDeleting={isDeleting}
                />
              )}
            </section>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent
          overlayClassName="bg-transparent"
          className="border border-border/70 bg-background/95 p-6 text-foreground shadow-2xl backdrop-blur-xl sm:max-w-md"
        >
          <DialogHeader className="space-y-2 text-left">
            <DialogTitle className="text-2xl text-foreground">
              Delete account?
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              This will permanently remove your Interview Handbook account and
              its saved data. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <AuthError message={deleteError} />

          <div className="mt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                setDeleteError(null);
                setDeleteDialogOpen(false);
              }}
              disabled={isDeleting}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-border bg-muted/40 px-4 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmDeleteAccount()}
              disabled={isDeleting}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-rose-500/25 bg-rose-500/10 px-4 text-sm font-medium text-rose-700 transition hover:bg-rose-500/15 dark:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isDeleting ? "Deleting..." : "Delete forever"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function ProfilePanel({
  username,
  initials,
}: Readonly<{
  username: string;
  initials: string;
}>) {
  return (
    <div className="space-y-6 md:space-y-7">
      <div>
        <h3 className="text-[1.95rem] font-semibold tracking-tight text-foreground md:text-[2rem]">
          Profile
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          View your account identity.
        </p>
      </div>

      <InfoRow
        label="Identity"
        content={
          <div className="flex items-center gap-4 rounded-3xl border border-border/70 bg-card/70 p-4 sm:p-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-muted/40">
              <span className="text-base font-semibold text-foreground">
                {initials}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="break-words text-lg font-semibold text-foreground">
                {username}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Username-based account
              </p>
            </div>
          </div>
        }
      />
    </div>
  );
}

function SecurityPanel({
  onRequestDeleteAccount,
  isDeleting,
}: Readonly<{
  onRequestDeleteAccount: () => void;
  isDeleting: boolean;
}>) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!newPassword) {
      setPasswordError("Please enter a new password.");
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password must match.");
      return;
    }

    if (!currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    setIsSavingPassword(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "We couldn't update your password.");
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setPasswordSuccess("Your password has been updated.");
    } catch (err) {
      setPasswordError(
        err instanceof Error ? err.message : "We couldn't update your password."
      );
    } finally {
      setIsSavingPassword(false);
    }
  };

  return (
    <div className="space-y-6 md:space-y-7">
      <div>
        <h3 className="text-[1.95rem] font-semibold tracking-tight text-foreground md:text-[2rem]">
          Security
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
          Manage your password and account.
        </p>
      </div>

      <InfoRow
        label="Password"
        content={
          <form
            onSubmit={handlePasswordSubmit}
            className="space-y-4 rounded-3xl border border-border/70 bg-card/70 p-4 sm:p-5"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">
                Change password
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Choose a new password for your account.
              </p>
            </div>

            <AuthError message={passwordError} />
            {passwordSuccess ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {passwordSuccess}
              </div>
            ) : null}

            <SettingsField
              label="Current password"
              type="password"
              value={currentPassword}
              onChange={setCurrentPassword}
              autoComplete="current-password"
              placeholder="Enter current password"
              disabled={isSavingPassword}
            />
            <SettingsField
              label="New password"
              type="password"
              value={newPassword}
              onChange={setNewPassword}
              autoComplete="new-password"
              placeholder="Enter new password"
              disabled={isSavingPassword}
            />
            <SettingsField
              label="Confirm password"
              type="password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              autoComplete="new-password"
              placeholder="Re-enter password"
              disabled={isSavingPassword}
            />

            <div className="w-full sm:max-w-[240px]">
              <AuthSubmitButton loading={isSavingPassword}>
                Update password
              </AuthSubmitButton>
            </div>
          </form>
        }
      />

      <InfoRow
        label="Danger zone"
        content={
          <button
            type="button"
            onClick={onRequestDeleteAccount}
            disabled={isDeleting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-rose-500/30 bg-rose-500/12 px-4 py-3 text-sm font-medium text-rose-600 transition hover:bg-rose-500/18 dark:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "Deleting account..." : "Delete account"}
          </button>
        }
      />
    </div>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
}: Readonly<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}>) {
  return (
    <DropdownMenu.Item asChild>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-sm text-foreground outline-none transition hover:bg-muted/50"
      >
        <span className="flex items-center gap-3">
          <span className="text-muted-foreground">{icon}</span>
          <span>{label}</span>
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </button>
    </DropdownMenu.Item>
  );
}

function SidebarTab({
  active,
  icon,
  label,
  onClick,
}: Readonly<{
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-medium transition md:flex md:w-full md:justify-start md:gap-3",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
      )}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function InfoRow({
  label,
  content,
}: Readonly<{
  label: string;
  content: React.ReactNode;
}>) {
  return (
    <div className="grid gap-4 border-b border-white/6 pb-6 last:border-b-0 last:pb-0 md:grid-cols-[150px_1fr] md:gap-5">
      <div className="pt-1 text-sm font-medium text-foreground md:text-[15px]">
        {label}
      </div>
      <div>{content}</div>
    </div>
  );
}

function SettingsField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  disabled,
}: Readonly<{
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  disabled?: boolean;
}>) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          className={cn(
            "h-12 w-full rounded-2xl border border-border bg-background px-4 text-foreground outline-none transition focus:border-primary/50 focus:ring-1 focus:ring-primary/40 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60",
            isPassword && "pr-12",
          )}
        />
        {isPassword ? (
          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-muted-foreground transition hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
            disabled={disabled}
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

function getInitials(username?: string) {
  if (!username) {
    return "IH";
  }

  const parts = username.split(/[^a-zA-Z0-9]+/).filter(Boolean).slice(0, 2);

  if (parts.length > 0) {
    return parts.map((part) => part[0]?.toUpperCase() || "").join("");
  }

  return username.slice(0, 2).toUpperCase();
}
