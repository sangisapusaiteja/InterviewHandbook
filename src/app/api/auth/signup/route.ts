import { NextResponse } from "next/server";
import {
  authServerEnabled,
  createUser,
  findUserByUsername,
  setSessionCookie,
} from "@/lib/auth-server";

const USERNAME_PATTERN = /^[a-zA-Z0-9_]{3,24}$/;

export async function POST(request: Request) {
  if (!authServerEnabled) {
    return NextResponse.json(
      { error: "Supabase is not configured. Add your Supabase keys to enable accounts." },
      { status: 503 }
    );
  }

  let body: { username?: string; password?: string };

  try {
    body = (await request.json()) as { username?: string; password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const username = body.username?.trim() ?? "";
  const password = body.password ?? "";

  if (!USERNAME_PATTERN.test(username)) {
    return NextResponse.json(
      { error: "Username must be 3-24 characters using letters, numbers, or underscores." },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }

  try {
    const existing = await findUserByUsername(username);

    if (existing) {
      return NextResponse.json(
        { error: "That username is already taken." },
        { status: 409 }
      );
    }

    const user = await createUser(username, password);
    await setSessionCookie({ userId: user.id, username: user.username });

    return NextResponse.json({ user }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "We couldn't create your account. Please try again." },
      { status: 500 }
    );
  }
}
