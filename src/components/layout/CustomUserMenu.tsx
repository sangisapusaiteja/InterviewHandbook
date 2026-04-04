"use client";

import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  BarChart3,
  BadgeCheck,
  ChevronRight,
  CircleAlert,
  Eye,
  EyeOff,
  Laptop,
  Link2,
  Loader2,
  LogOut,
  Mail,
  PencilLine,
  Shield,
  Trash2,
  UserCircle2,
} from "lucide-react";
import {
  useAuth,
  useClerk,
  useSession,
  useUser,
} from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type {
  CreateExternalAccountParams,
  EmailCodeFactor,
  SessionWithActivitiesResource,
  SessionVerificationResource,
} from "@clerk/types";
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
  getClerkErrorMessage,
} from "@/components/auth/CustomAuthShared";
import { cn } from "@/lib/utils";

type AccountTab = "profile" | "security";

export function CustomUserMenu() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const { sessionId } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AccountTab>("profile");
  const [sessions, setSessions] = useState<SessionWithActivitiesResource[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [reverificationState, setReverificationState] = useState<{
    open: boolean;
  }>({ open: false });
  const reverificationCompleteRef = useRef<(() => void) | null>(null);
  const reverificationCancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!accountOpen || !user) {
      return;
    }

    let alive = true;
    setIsLoadingSessions(true);

    void user
      .getSessions()
      .then((items) => {
        if (alive) {
          setSessions(items);
        }
      })
      .finally(() => {
        if (alive) {
          setIsLoadingSessions(false);
        }
      });

    return () => {
      alive = false;
    };
  }, [accountOpen, user]);

  const primaryEmail =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses[0]?.emailAddress ||
    "";
  const initials = useMemo(
    () => getInitials(user?.fullName, primaryEmail),
    [primaryEmail, user?.fullName],
  );

  const handleSignOut = async () => {
    await signOut({ redirectUrl: "/sign-in" });
  };

  const confirmDeleteAccount = async () => {
    setDeleteError(null);

    reverificationCompleteRef.current = async () => {
      try {
        setIsDeleting(true);

        await user?.delete();
        await signOut({ redirectUrl: "/sign-up" });
      } catch {
        setDeleteError("Failed to delete account.");
      } finally {
        setIsDeleting(false);
      }
    };

    setReverificationState({
      open: true,
    });
  };

  const closeCustomReverification = () => {
    setReverificationState({ open: false });
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
            {user.imageUrl ? (
              // Clerk avatar URLs are remote and lightweight, so a plain img keeps this menu simple.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.imageUrl}
                alt={user.fullName || "Account avatar"}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-xs font-semibold text-foreground">
                {initials}
              </span>
            )}
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
                  {user.imageUrl ? (
                    // Clerk avatar URLs are remote and lightweight, so a plain img keeps this menu simple.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || "Account avatar"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-foreground">
                      {initials}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-foreground">
                    {user.fullName || "Interview Handbook member"}
                  </p>
                  <p className="truncate text-sm text-muted-foreground">
                    {primaryEmail}
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
                <ProfilePanel
                  user={user}
                  primaryEmail={primaryEmail}
                  initials={initials}
                />
              ) : (
                <SecurityPanel
                  user={user}
                  sessions={sessions}
                  currentSessionId={sessionId}
                  isLoadingSessions={isLoadingSessions}
                  passwordEnabled={user.passwordEnabled}
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

      <CustomReverificationDialog
        open={reverificationState.open}
        onCancel={() => {
          reverificationCancelRef.current?.();
          closeCustomReverification();
        }}
        onComplete={() => {
          reverificationCompleteRef.current?.();
          closeCustomReverification();
        }}
      />
    </>
  );
}

function ProfilePanel({
  user,
  primaryEmail,
  initials,
}: Readonly<{
  user: NonNullable<ReturnType<typeof useUser>["user"]>;
  primaryEmail: string;
  initials: string;
}>) {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  useEffect(() => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
  }, [user.firstName, user.lastName]);

  const handleProfileSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    setIsSavingProfile(true);

    try {
      await user.update({
        firstName: firstName.trim() || null,
        lastName: lastName.trim() || null,
      });
      setProfileSuccess("Profile details updated.");
      setIsEditing(false);
    } catch (error) {
      setProfileError(
        getClerkErrorMessage(
          error,
          "We couldn't update your profile right now. Please try again.",
        ),
      );
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleProfileImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setProfileError(null);
    setProfileSuccess(null);
    setIsUploadingImage(true);

    try {
      await user.setProfileImage({ file });
      setProfileSuccess("Profile photo updated.");
    } catch (error) {
      setProfileError(
        getClerkErrorMessage(
          error,
          "We couldn't update your profile photo right now.",
        ),
      );
    } finally {
      setIsUploadingImage(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-6 md:space-y-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-[1.95rem] font-semibold tracking-tight text-foreground md:text-[2rem]">
            Profile
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
            View your account identity, email addresses, and linked sign-in
            methods.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setProfileError(null);
            setProfileSuccess(null);
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setIsEditing((current) => !current);
          }}
          className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
        >
          <PencilLine className="h-4 w-4" />
          <span>{isEditing ? "Cancel" : "Edit"}</span>
        </button>
      </div>

      <InfoRow
        label="Identity"
        content={
          <form
            onSubmit={handleProfileSave}
            className="space-y-4 rounded-3xl border border-border/70 bg-card/70 p-4 sm:p-5"
          >
            <AuthError message={profileError} />
            {profileSuccess ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {profileSuccess}
              </div>
            ) : null}

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border/70 bg-muted/40">
                {user.imageUrl ? (
                  // Clerk avatar URLs are remote and lightweight, so a plain img keeps this menu simple.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={user.imageUrl}
                    alt={user.fullName || "Account avatar"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-base font-semibold text-foreground">
                    {initials}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                {isEditing ? (
                  <div className="space-y-3">
                    <div className="grid gap-4 md:grid-cols-2">
                      <SettingsField
                        label="First name"
                        value={firstName}
                        onChange={setFirstName}
                        autoComplete="given-name"
                        placeholder="First name"
                        disabled={isSavingProfile}
                      />
                      <SettingsField
                        label="Last name"
                        value={lastName}
                        onChange={setLastName}
                        autoComplete="family-name"
                        placeholder="Last name"
                        disabled={isSavingProfile}
                      />
                    </div>

                    <label className="inline-flex cursor-pointer items-center rounded-xl border border-border bg-muted/40 px-3 py-2 text-xs font-medium text-foreground transition hover:bg-muted">
                      {isUploadingImage ? "Uploading..." : "Change photo"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(event) => void handleProfileImageChange(event)}
                        disabled={isUploadingImage}
                      />
                    </label>
                  </div>
                ) : (
                  <>
                    <p className="break-words text-lg font-semibold text-foreground">
                      {user.fullName || "Interview Handbook member"}
                    </p>
                    <p className="break-all text-sm text-muted-foreground">
                      {primaryEmail}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Signed up{" "}
                      {user.createdAt
                        ? formatDateTime(user.createdAt)
                        : "recently"}
                    </p>
                  </>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="w-full sm:max-w-[220px]">
                <AuthSubmitButton loading={isSavingProfile}>
                  Save profile
                </AuthSubmitButton>
              </div>
            ) : null}
          </form>
        }
      />

      <InfoRow
        label="Email addresses"
        content={
          <div className="space-y-3">
            {user.emailAddresses.map((email) => (
              <div
                key={email.id}
                className="flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="break-all text-sm text-foreground">
                    {email.emailAddress}
                  </span>
                </div>
                {user.primaryEmailAddressId === email.id ? (
                  <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    Primary
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        }
      />

      <ConnectedAccountsPanel user={user} />
    </div>
  );
}

function ConnectedAccountsPanel({
  user,
}: Readonly<{
  user: NonNullable<ReturnType<typeof useUser>["user"]>;
}>) {
  const [connectError, setConnectError] = useState<string | null>(null);
  const [connectSuccess, setConnectSuccess] = useState<string | null>(null);
  const [isConnectingProvider, setIsConnectingProvider] =
    useState<"google" | null>(null);
  const [reverificationOpen, setReverificationOpen] = useState(false);
  const pendingConnectRef = useRef<(() => Promise<void>) | null>(null);

  const connectedProviders = new Set(
    user.externalAccounts.map((account) => account.provider),
  );
  const canConnectGoogle = !connectedProviders.has("google");

  const handleConnectProvider = async (
    provider: "google",
    strategy: CreateExternalAccountParams["strategy"],
  ) => {
    setConnectError(null);
    setConnectSuccess(null);
    setIsConnectingProvider(provider);

    pendingConnectRef.current = async () => {
      try {
        const account = await user.createExternalAccount({
          strategy,
          redirectUrl: "/sso-callback",
        });

        const redirectUrl =
          account.verification?.externalVerificationRedirectURL?.href;

        if (redirectUrl) {
          window.location.assign(redirectUrl);
          return;
        }

        setConnectSuccess(
          `${titleizeProvider(provider)} connected successfully.`,
        );
      } catch (error) {
        setConnectError(
          getClerkErrorMessage(
            error,
            `We couldn't connect your ${titleizeProvider(provider)} account right now.`,
          ),
        );
      } finally {
        setIsConnectingProvider(null);
      }
    };

    setReverificationOpen(true);
  };

  return (
    <>
      <InfoRow
        label="Connected accounts"
        content={
          <div className="space-y-4">
            <AuthError message={connectError} />
            {connectSuccess ? (
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                {connectSuccess}
              </div>
            ) : null}

            {user.externalAccounts.length > 0 ? (
              <div className="space-y-3">
                {user.externalAccounts.map((account) => (
                  <div
                    key={account.id}
                    className="flex flex-col items-start gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                      <div className="min-w-0">
                        <p className="text-sm font-medium capitalize text-foreground">
                          {account.provider
                            .replace("oauth_", "")
                            .replaceAll("_", " ")}
                        </p>
                        <p className="break-all text-xs text-muted-foreground">
                          {account.emailAddress || "Connected"}
                        </p>
                      </div>
                    </div>
                    <BadgeCheck className="h-4 w-4 text-emerald-500" />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyNote text="No social connections linked to this account yet." />
            )}

            {canConnectGoogle ? (
              <div className="rounded-3xl border border-border/70 bg-card/70 p-4">
                <p className="text-sm font-semibold text-foreground">
                  Add another sign-in method
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Connect a provider so you can sign in with it later.
                </p>

                <div className="mt-4 grid gap-3 sm:flex sm:flex-wrap">
                  {canConnectGoogle ? (
                    <button
                      type="button"
                      onClick={() =>
                        void handleConnectProvider("google", "oauth_google")
                      }
                      disabled={isConnectingProvider !== null}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                    >
                      <GoogleMark className="h-4 w-4" />
                      <span>
                        {isConnectingProvider === "google"
                          ? "Connecting Google..."
                          : "Connect Google"}
                      </span>
                    </button>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        }
      />

      <CustomReverificationDialog
        open={reverificationOpen}
        onCancel={() => {
          pendingConnectRef.current = null;
          setReverificationOpen(false);
          setIsConnectingProvider(null);
        }}
        onComplete={() => {
          const action = pendingConnectRef.current;
          pendingConnectRef.current = null;
          setReverificationOpen(false);
          void action?.();
        }}
      />
    </>
  );
}

function SecurityPanel({
  user,
  sessions,
  currentSessionId,
  isLoadingSessions,
  passwordEnabled,
  onRequestDeleteAccount,
  isDeleting,
}: Readonly<{
  user: NonNullable<ReturnType<typeof useUser>["user"]>;
  sessions: SessionWithActivitiesResource[];
  currentSessionId: string | null | undefined;
  isLoadingSessions: boolean;
  passwordEnabled: boolean;
  onRequestDeleteAccount: () => void;
  isDeleting: boolean;
}>) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signOutOthers, setSignOutOthers] = useState(false);
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

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirm password must match.");
      return;
    }

    if (passwordEnabled && !currentPassword) {
      setPasswordError("Please enter your current password.");
      return;
    }

    setIsSavingPassword(true);

    try {
      await user.updatePassword({
        newPassword,
        currentPassword: passwordEnabled ? currentPassword : undefined,
        signOutOfOtherSessions: signOutOthers,
      });

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setSignOutOthers(false);
      setPasswordSuccess(
        passwordEnabled
          ? "Your password has been updated."
          : "A password has been added to your account.",
      );
    } catch (error) {
      setPasswordError(
        getClerkErrorMessage(
          error,
          "We couldn't update your password. Please try again.",
        ),
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
          Review sign-in methods, protection status, and recent devices.
        </p>
      </div>

      <InfoRow
        label="Password"
        content={
          <div className="space-y-4">
            <StatusCard
              icon={<Shield className="h-4 w-4" />}
              title={
                passwordEnabled ? "Password enabled" : "Google-only account"
              }
              description={
                passwordEnabled
                  ? "You can sign in with your email and password."
                  : "This account currently signs in through Google, but you can add a password below."
              }
            />

            <form
              onSubmit={handlePasswordSubmit}
              className="space-y-4 rounded-3xl border border-border/70 bg-card/70 p-4 sm:p-5"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {passwordEnabled ? "Change password" : "Set password"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {passwordEnabled
                    ? "Choose a new password for your account."
                    : "Add a password so you can sign in without Google too."}
                </p>
              </div>

              <AuthError message={passwordError} />
              {passwordSuccess ? (
                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
                  {passwordSuccess}
                </div>
              ) : null}

              {passwordEnabled ? (
                <SettingsField
                  label="Current password"
                  type="password"
                  value={currentPassword}
                  onChange={setCurrentPassword}
                  autoComplete="current-password"
                  placeholder="Enter current password"
                  disabled={isSavingPassword}
                />
              ) : null}

              <SettingsField
                label={passwordEnabled ? "New password" : "Set password"}
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

              <label className="flex items-start gap-3 rounded-xl border border-border/70 bg-muted/30 px-3 py-2.5 text-sm text-muted-foreground">
                <input
                  type="checkbox"
                  checked={signOutOthers}
                  onChange={(event) => setSignOutOthers(event.target.checked)}
                  disabled={isSavingPassword}
                  className="mt-0.5 h-4 w-4 rounded border-border bg-transparent text-primary focus:ring-primary"
                />
                <span>Sign out of other sessions after updating password</span>
              </label>

              <div className="w-full sm:max-w-[240px]">
                <AuthSubmitButton loading={isSavingPassword}>
                  {passwordEnabled ? "Update password" : "Set password"}
                </AuthSubmitButton>
              </div>
            </form>
          </div>
        }
      />

      <InfoRow
        label="Active devices"
        content={
          isLoadingSessions ? (
            <EmptyNote text="Loading recent device activity..." />
          ) : sessions.length > 0 ? (
            <div className="space-y-3">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className="rounded-2xl border border-border/70 bg-card/70 px-4 py-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 rounded-xl border border-border/70 bg-muted/40 p-2">
                      <Laptop className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {session.latestActivity.browserName ||
                            "Browser session"}
                        </p>
                        {session.id === currentSessionId ? (
                          <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                            This device
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 break-words text-sm text-muted-foreground">
                        {buildSessionMeta(session)}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Last active {formatDateTime(session.lastActiveAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyNote text="No recent session activity is available yet." />
          )
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

function StatusCard({
  icon,
  title,
  description,
}: Readonly<{
  icon: React.ReactNode;
  title: string;
  description: string;
}>) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card/70 px-4 py-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>
      <div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function EmptyNote({ text }: Readonly<{ text: string }>) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border/70 bg-card/70 px-4 py-3 text-sm text-muted-foreground">
      <CircleAlert className="h-4 w-4" />
      <span>{text}</span>
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

function CustomReverificationDialog({
  open,
  onCancel,
  onComplete,
}: {
  open: boolean;
  onCancel: () => void;
  onComplete: () => void;
}) {
  const { session } = useSession();

  const [verification, setVerification] =
    useState<SessionVerificationResource | null>(null);

  const [mode, setMode] = useState<"loading" | "password" | "email_code">(
    "loading",
  );

  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [emailFactor, setEmailFactor] = useState<EmailCodeFactor | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [isBusy, setIsBusy] = useState(false);

  // 🚀 INIT VERIFICATION
  const hasStartedRef = useRef(false);

  useEffect(() => {
    if (!open || !session || hasStartedRef.current) return;

    hasStartedRef.current = true;

    let alive = true;

    (async () => {
      try {
        setMode("loading");
        setError(null);

        const resource = await session.startVerification({
          level: "first_factor",
        });

        if (!alive) return;

        setVerification(resource);

        const passwordFactor = resource.supportedFirstFactors?.find(
          (f) => f.strategy === "password",
        );

        const emailFactor = resource.supportedFirstFactors?.find(
          (f) => f.strategy === "email_code",
        );
        console.log(resource.supportedFirstFactors, "emailFactor");

        // ✅ Always start with password (NO blinking)
        if (passwordFactor) {
          setMode("password");
        } else if (emailFactor) {
          setEmailFactor(emailFactor);
          setMode("email_code");

          await session.prepareFirstFactorVerification({
            strategy: "email_code",
            emailAddressId: emailFactor.emailAddressId,
          });
        } else {
          setError("No verification methods available.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Failed to start verification.");
      }
    })();

    return () => {
      alive = false;
    };
  }, [open, session]);

  // 🔄 SWITCH TO EMAIL
  const switchToEmail = async () => {
    if (!session || !verification) return;

    const factor = verification.supportedFirstFactors?.find(
      (f): f is EmailCodeFactor => f.strategy === "email_code",
    );

    if (!factor) return;

    try {
      setMode("loading");

      await session.prepareFirstFactorVerification({
        strategy: "email_code",
        emailAddressId: factor.emailAddressId,
      });

      setEmailFactor(factor);
      setMode("email_code");
    } catch (err) {
      console.error(err);
      setError("Failed to send code.");
      setMode("password");
    }
  };

  // 🔄 SWITCH TO PASSWORD
  const switchToPassword = () => {
    setMode("password");
    setError(null);
  };

  // 🔐 PASSWORD VERIFY
  const verifyPassword = async () => {
    if (!session) return;

    setIsBusy(true);
    setError(null);

    try {
      const res = await session.attemptFirstFactorVerification({
        strategy: "password",
        password,
      });

      if (res.status === "complete") {
        onComplete();
      }
    } catch {
      setError("Incorrect password.");
    } finally {
      setIsBusy(false);
    }
  };

  // 🔢 CODE VERIFY
  const verifyCode = async () => {
    if (!session) return;

    setIsBusy(true);
    setError(null);

    try {
      const res = await session.attemptFirstFactorVerification({
        strategy: "email_code",
        code,
      });

      if (res.status === "complete") {
        onComplete();
      }
    } catch {
      setError("Invalid code.");
    } finally {
      setIsBusy(false);
    }
  };

  // 🔥 👉 PUT IT HERE (RIGHT AFTER ABOVE useEffect)
  useEffect(() => {
    if (!open) {
      hasStartedRef.current = false;
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onCancel()}>
      <DialogContent overlayClassName="bg-transparent" className="sm:max-w-md p-6">
        {/* HEADER */}
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl">Verification required</DialogTitle>
          <DialogDescription>
            {mode === "email_code" && emailFactor
              ? `Enter code sent to ${emailFactor.safeIdentifier}`
              : "Re-enter your password to continue"}
          </DialogDescription>
        </DialogHeader>

        {/* ERROR */}
        {error && <p className="text-sm text-red-500 mt-3">{error}</p>}

        {/* LOADING */}
        {mode === "loading" && (
          <div className="flex justify-center py-6">
            <Loader2 className="animate-spin" />
          </div>
        )}

        {/* PASSWORD */}
        {mode === "password" && (
          <>
            <SettingsField
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter password"
            />

            <button
              onClick={verifyPassword}
              disabled={!password || isBusy}
              className="btn-primary w-full mt-3"
            >
              Continue
            </button>

            {verification?.supportedFirstFactors?.some(
              (f) => f.strategy === "email_code",
            ) && (
              <button
                onClick={switchToEmail}
                className="text-sm mt-3 text-primary w-full"
              >
                Use another method
              </button>
            )}
          </>
        )}

        {/* EMAIL CODE */}
        {mode === "email_code" && (
          <>
            <SettingsField
              label="Verification code"
              value={code}
              onChange={setCode}
              placeholder="123456"
            />

            <button
              onClick={verifyCode}
              disabled={code.length < 6 || isBusy}
              className="btn-primary w-full mt-3"
            >
              Continue
            </button>

            <div className="flex justify-between mt-3 text-sm">
              <button onClick={switchToEmail}>Resend code</button>

              {verification?.supportedFirstFactors?.some(
                (f) => f.strategy === "password",
              ) && (
                <button onClick={switchToPassword}>Use password instead</button>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function getInitials(fullName?: string | null, email?: string) {
  if (fullName) {
    const parts = fullName.split(" ").filter(Boolean).slice(0, 2);
    if (parts.length > 0) {
      return parts.map((part) => part[0]?.toUpperCase() || "").join("");
    }
  }

  return (email?.slice(0, 2) || "IH").toUpperCase();
}

function formatDateTime(value: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

function buildSessionMeta(session: SessionWithActivitiesResource) {
  const bits = [
    session.latestActivity.deviceType,
    session.latestActivity.browserVersion
      ? `${session.latestActivity.browserName || "Browser"} ${session.latestActivity.browserVersion}`
      : undefined,
    [session.latestActivity.city, session.latestActivity.country]
      .filter(Boolean)
      .join(", "),
    session.latestActivity.ipAddress,
  ].filter(Boolean);

  return bits.join(" • ");
}

function titleizeProvider(provider: "google") {
  return provider === "google" ? "Google" : provider;
}

function GoogleMark({ className }: Readonly<{ className?: string }>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
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
