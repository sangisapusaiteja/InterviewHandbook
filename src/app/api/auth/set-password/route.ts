import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth-server";
import { supabaseAdminRequest } from "@/lib/supabase-rest";

/**
 * Lets Google-auth users (who never had a password) get one:
 * - GET                → returns the pending generated password, if any.
 * - { generate: true } → creates a strong readable password. Stored so it
 *                        KEEPS being displayed until the user changes it.
 * - { newPassword }    → stores a user-chosen password, flips the account to
 *                        normal password login, and clears the generated one.
 * Only available while auth_provider is 'google'.
 */

const ALPHABET = "abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateReadablePassword(length = 12): string {
  const bytes = crypto.getRandomValues(new Uint8Array(length));
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join("");
}

interface PasswordRow {
  auth_provider?: string;
  generated_password?: string | null;
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user || user.auth_provider !== "google") {
    return NextResponse.json({});
  }

  const rows = await supabaseAdminRequest<PasswordRow[]>("users", {
    query: {
      select: "auth_provider,generated_password",
      id: `eq.${user.id}`,
      limit: "1",
    },
  });

  const row = rows[0];
  return NextResponse.json({
    generatedPassword: row?.generated_password ?? null,
  });
}

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  if (user.auth_provider !== "google") {
    return NextResponse.json(
      { error: "Your account already uses a password. Use change password instead." },
      { status: 403 }
    );
  }

  let body: { generate?: boolean; newPassword?: string };

  try {
    body = (await request.json()) as { generate?: boolean; newPassword?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const generating = body.generate === true;
  const newPassword = generating ? generateReadablePassword(12) : String(body.newPassword ?? "");

  if (!newPassword) {
    return NextResponse.json({ error: "Enter a new password." }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  try {
    await supabaseAdminRequest("users", {
      method: "PATCH",
      query: { id: `eq.${user.id}` },
      body: {
        password_hash: bcrypt.hashSync(newPassword, 10),
        generated_password: newPassword,
        // Stay 'google' while it's just the generated placeholder; the
        // change-password flow below flips the account to 'password'.
        ...(generating ? {} : { auth_provider: "password" }),
        updated_at: new Date().toISOString(),
      },
    });

    return NextResponse.json({
      ok: true,
      generatedPassword: newPassword,
    });
  } catch {
    return NextResponse.json(
      { error: "We couldn't update your password. Please try again." },
      { status: 500 }
    );
  }
}
