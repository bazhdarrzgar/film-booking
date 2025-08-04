// Session management utilities

import { db } from "./database.ts";
import { generateSessionToken } from "./crypto.ts";

const SESSION_COOKIE_NAME = "session_token";

export function getSessionFromRequest(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;
  
  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);
  
  return cookies[SESSION_COOKIE_NAME] || null;
}

export async function getCurrentUser(request: Request): Promise<string | null> {
  const sessionToken = getSessionFromRequest(request);
  if (!sessionToken) return null;
  
  const session = await db.getSession(sessionToken);
  if (!session) return null;
  
  return session.userId;
}

export async function createSessionResponse(userId: string, response: Response): Promise<Response> {
  const sessionToken = generateSessionToken();
  await db.createSession(userId, sessionToken);
  
  const headers = new Headers(response.headers);
  headers.set("Set-Cookie", `${SESSION_COOKIE_NAME}=${sessionToken}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${24 * 60 * 60}`);
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export async function destroySessionResponse(request: Request, response: Response): Promise<Response> {
  const sessionToken = getSessionFromRequest(request);
  if (sessionToken) {
    await db.deleteSession(sessionToken);
  }
  
  const headers = new Headers(response.headers);
  headers.set("Set-Cookie", `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

export async function requireAuth(request: Request): Promise<{ userId: string } | Response> {
  const userId = await getCurrentUser(request);
  if (!userId) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/login" }
    });
  }
  return { userId };
}