import { NextResponse } from "next/server";
import {
  createPasswordHash,
  findUserByUsername,
  getCurrentUser,
  verifyPassword,
} from "@/lib/auth-server";
import { supabaseAdminRequest } from "@/lib/supabase-rest";

export async function POST(request: Request) {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Sign in to change your password." }, { status: 401 });
  }

  let body: { currentPassword?: string; newPassword?: string };

  try {
    body = (await request.json()) as { currentPassword?: string; newPassword?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const currentPassword = body.currentPassword ?? "";
  const newPassword = body.newPassword ?? "";

  if (!currentPassword || !newPassword) {
    return NextResponse.json(
      { error: "Enter your current and new password." },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  try {
    const row = await findUserByUsername(user.username);

    if (!row || !verifyPassword(currentPassword, row.password_hash)) {
      return NextResponse.json(
        { error: "Your current password is incorrect." },
        { status: 401 }
      );
    }

    await supabaseAdminRequest("users", {
      method: "PATCH",
      query: {
        id: `eq.${user.id}`,
      },
      body: {
        password_hash: createPasswordHash(newPassword),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "We couldn't update your password. Please try again." },
      { status: 500 }
    );
  }
}
