import { AuthShell } from "@/components/auth/AuthShell";
import { CustomSignUpForm } from "@/components/auth/CustomSignUpForm";

export default function SignUpPage() {
  return (
    <AuthShell
      title="Create your Interview Handbook account"
      description="Set up your account once and keep your learning flow ready whenever you come back."
    >
      <CustomSignUpForm />
    </AuthShell>
  );
}
