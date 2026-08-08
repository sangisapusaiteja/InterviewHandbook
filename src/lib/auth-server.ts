import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { supabaseAdminRequest, supabaseServerEnabled } from "@/lib/supabase-rest";

export const SESSION_COOKIE_NAME = "ih_session";

export type AuthUser = {
  id: string;
  username: string;
  createdAt: string;
};

type UserRow = {
  id: string;
  username: string;
  password_hash: string;
  created_at: string;
};

type SessionRow = {
  id: string;
  user_id: string;
  expires_at: string;
};

export const authServerEnabled = supabaseServerEnabled;

function hashPassword(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

export function createPasswordHash(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = hashPassword(password, salt);
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string) {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) {
    return false;
  }

  const candidate = Buffer.from(hashPassword(password, salt), "hex");
  const expected = Buffer.from(hash, "hex");

  if (candidate.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(candidate, expected);
}

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function getSessionToken() {
  const store = cookies();
  return store.get(SESSION_COOKIE_NAME)?.value ?? null;
}

export async function createSession(userId: string) {
  const token = createSessionToken();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await supabaseAdminRequest("auth_sessions", {
    method: "POST",
    prefer: "return=representation",
    body: [
      {
        id: token,
        user_id: userId,
        expires_at: expiresAt,
      },
    ],
  });

  const store = cookies();
  store.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(expiresAt),
  });

  return token;
}

export async function destroySession() {
  const token = getSessionToken();

  if (token) {
    try {
      await supabaseAdminRequest("auth_sessions", {
        method: "DELETE",
        query: {
          id: `eq.${token}`,
        },
      });
    } catch {
      // Ignore cleanup failures; the cookie is still cleared below.
    }
  }

  const store = cookies();
  store.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!authServerEnabled) {
    return null;
  }

  const token = getSessionToken();

  if (!token) {
    return null;
  }

  try {
    const sessions = await supabaseAdminRequest<SessionRow[]>("auth_sessions", {
      query: {
        select: "id,user_id,expires_at",
        id: `eq.${token}`,
        limit: "1",
      },
    });

    const session = sessions[0];

    if (!session || new Date(session.expires_at).getTime() < Date.now()) {
      return null;
    }

    const users = await supabaseAdminRequest<UserRow[]>("auth_users", {
      query: {
        select: "id,username,password_hash,created_at",
        id: `eq.${session.user_id}`,
        limit: "1",
      },
    });

    const user = users[0];

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      username: user.username,
      createdAt: user.created_at,
    };
  } catch {
    return null;
  }
}

export async function findUserByUsername(username: string) {
  const users = await supabaseAdminRequest<UserRow[]>("auth_users", {
    query: {
      select: "id,username,password_hash,created_at",
      username: `eq.${username}`,
      limit: "1",
    },
  });

  return users[0] ?? null;
}

export async function createUser(username: string, password: string) {
  const id = randomBytes(16).toString("hex");
  const passwordHash = createPasswordHash(password);

  const rows = await supabaseAdminRequest<UserRow[]>("auth_users", {
    method: "POST",
    prefer: "return=representation",
    body: [
      {
        id,
        username,
        password_hash: passwordHash,
      },
    ],
  });

  const user = rows[0];

  if (!user) {
    throw new Error("Failed to create user.");
  }

  return {
    id: user.id,
    username: user.username,
    createdAt: user.created_at,
  };
}
