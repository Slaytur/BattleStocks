import { eq } from "drizzle-orm";
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { RequestEvent } from "@sveltejs/kit";

import { db } from "../../../../shared/src/db.js";

import { Session } from "../../../../shared/src/models/Session.js";
import { User } from "../../../../shared/src/models/User.js";

import type { SessionDoc } from "../../../../shared/src/modules/Session";
import type { UserDoc } from "../../../../shared/src/modules/User";

export type SessionValidationResult =
    | { session: SessionDoc, user: UserDoc }
    | { session: null, user: null };

export function generateSessionToken (): string {
    const bytes = new Uint8Array(20);
    crypto.getRandomValues(bytes);

    const token = encodeBase32LowerCaseNoPadding(bytes);
    return token;
}

export async function createSession (token: string, userId: number): Promise<SessionDoc> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const session: typeof Session.$inferInsert = {
        sessionId: sessionId,
        userId,
        expiresAt: new Date(Date.now() + 2592e6) // 30 days
    };

    await db.insert(Session).values(session);
    return session as SessionDoc;
}

export async function validateSessionToken (token: string): Promise<SessionValidationResult> {
    const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
    const result = await db
        .select({ user: User, session: Session })
        .from(Session)
        .innerJoin(User, eq(Session.userId, User.id))
        .where(eq(Session.sessionId, sessionId));

    if (result.length < 1) return { session: null, user: null };

    const { user, session } = result[0];
    if (Date.now() >= session.expiresAt.getTime()) {
        await db.delete(Session).where(eq(Session.sessionId, session.sessionId));
        return { session: null, user: null };
    }

    if (Date.now() >= session.expiresAt.getTime() - 1296e6) { // 15 days
        session.expiresAt = new Date(Date.now() + 2592e6); // 30 days
        await db
            .update(Session)
            .set({
                expiresAt: session.expiresAt
            })
            .where(eq(Session.sessionId, session.sessionId));
    }

    return { session, user };
}

export async function invalidateSession (sessionId: string): Promise<void> {
    await db.delete(Session).where(eq(Session.sessionId, sessionId));
}

export async function invalidateAllSessions (userId: number): Promise<void> {
    await db.delete(Session).where(eq(Session.userId, userId));
}

export function setSessionTokenCookie (event: RequestEvent, token: string, expiresAt: Date): void {
    event.cookies.set("session", token, {
        httpOnly: true,
        sameSite: "lax",
        expires: expiresAt,
        path: "/"
    });
}

export function deleteSessionTokenCookie (event: RequestEvent): void {
    event.cookies.set("session", "", {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 0,
        path: "/"
    });
}
