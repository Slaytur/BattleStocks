import { eq, type InferSelectModel } from "drizzle-orm";

import { Argon2id } from "oslo/password";

import { User } from "../models/User.js";
import { db } from "../../../shared/src/db.js";
import { userInfo } from "os";

export type UserDoc = InferSelectModel<typeof User>;

export async function createUserFromGoogle (googleId: string, email: string, name: string, picture: string): Promise<UserDoc> {
    const user: Partial<UserDoc> = {
        name,
        email,
        googleId
    };

    db.insert(User).values(user);

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

    if (!(await getUserFromEmail(email))) return null;

    // console.log(`beuh`, user);

    try {
        console.log(db.insert(User).values(user));
    } catch (err) {
        console.log(err);
    }

    return user;
}

export async function loginUserFromCreds (email: string, password: string): Promise<boolean> {
    const user = await getUserFromEmail(email);

    // console.log(user, password);
    if (!user) return false;
    const res = await (new Argon2id()).verify(user.password!, password);

    return res;
}

export async function getUserFromEmail (email: string): Promise<UserDoc | null> {
    // console.log(`EMAIL`, email);
    const user = await db.select().from(User).where(eq(User.email, email));
    return user as unknown as UserDoc;
}
