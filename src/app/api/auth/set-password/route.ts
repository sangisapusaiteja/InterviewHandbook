import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getCurrentUser } from "@/lib/auth-server";
import { supabaseAdminRequest } from "@/lib/supabase-rest";

/**
 * Password management for the Security tab.
 * - Account WITHOUT a password (Google sign-up): create one — no current needed.
 * - Account WITH a password: change it — requires the existing password.
 */

interface UserRow {
  id?: string;
  username?: string;
  password_hash?: string | null;
}

export async function POST(request: Request) {
  const sessionUser = await getCurrentUser();

  if (!sessionUser) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };

  try {
    body = (await request.json()) as {
      currentPassword?: string;
      newPassword?: string;
    };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const newPassword = String(body.newPassword ?? "");
  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  const rows = await supabaseAdminRequest<UserRow[]>("users", {
    query: {
      select: "id,username,password_hash",
      id: `eq.${sessionUser.id}`,
      limit: "1",
    },
  });

  const row = rows[0];
  if (!row) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const hasPassword = Boolean(row.password_hash);
  const passwordHash = bcrypt.hashSync(newPassword, 10);

  if (!hasPassword) {
    // CREATE — no current password required.
    await supabaseAdminRequest("users", {
      method: "PATCH",
      query: { id: `eq.${sessionUser.id}` },
      body: { password_hash: passwordHash, auth_provider: "password" },
    });

    return NextResponse.json({ ok: true, mode: "created" });
  }

  // CHANGE — verify existing password first.
  const currentPassword = String(body.currentPassword ?? "");
  if (!currentPassword) {
    return NextResponse.json(
      { error: "Enter your current password." },
      { status: 400 }
    );
  }

  if (!bcrypt.compareSync(currentPassword, row.password_hash as string)) {
    return NextResponse.json(
      { error: "Your current password is incorrect." },
      { status: 401 }
    );
  }

  await supabaseAdminRequest("users", {
    method: "PATCH",
    query: { id: `eq.${sessionUser.id}` },
    body: { password_hash: passwordHash },
  });

  return NextResponse.json({ ok: true, mode: "changed" });
}
