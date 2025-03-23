import { eq, type InferSelectModel } from "drizzle-orm";

import { Argon2id } from "oslo/password";

import { User } from "../models/User.js";
import { db } from "../../../shared/src/db.js";
import { SessionDoc } from "./Session.js";
import { generateSessionToken, createSession } from "../../../client/src/lib/server/session.js";

export type UserDoc = InferSelectModel<typeof User>;

export async function createUserFromGoogle (googleId: string, email: string, name: string, picture: string): Promise<UserDoc> {
    const user: typeof User.$inferInsert = {
        name,
        email,
        googleId
    };

    await db.insert(User).values(user);

    const userDoc = await db.query.user.findFirst({ where: eq(User.googleId, googleId) });
    return userDoc ?? user as UserDoc;
}

export async function getUserFromGoogleId (googleId: string): Promise<UserDoc | null> {
    const user = await db.query.user.findFirst({ where: eq(User.googleId, googleId) });
    return user ?? null;
};

export async function createUserFromCreds (email: string, password: string): Promise<UserDoc | null> {
    const hash = await (new Argon2id().hash(password));
    const user: typeof User.$inferInsert = {
        email,
        password: hash
    };

    if (await getUserFromEmail(email)) return null;

    try {
        await db.insert(User).values(user);
    } catch (err) {
        console.log(err);
    }

    return user as UserDoc;
}

export async function loginUserFromCreds (email: string, password: string): Promise<SessionDoc | null> {
    const argon2id = new Argon2id();
    const user = await getUserFromEmail(email);

    if (!user) return null;
    if (!user.password) return null;
    const res = await argon2id.verify(user.password, password);

    if (res) {
        const session = await createSession(generateSessionToken(), user.id);
        return session;
    } else return null;
}

export async function getUserFromEmail (email: string): Promise<UserDoc | null> {
    const user = await db.select().from(User).where(eq(User.email, email));
    return user[0] as UserDoc;
}
