import { AuthShell } from "@/components/auth/AuthShell";
import { CustomSignInForm } from "@/components/auth/CustomSignInForm";

export default function SignInPage() {
  return (
    <AuthShell
      title="Sign in and continue your prep"
      description="Jump back into your handbook, unlock AJet, and keep your interview prep in one focused workspace."
    >
      <CustomSignInForm />
    </AuthShell>
  );
}
