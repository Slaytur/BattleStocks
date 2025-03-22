import { eq, type InferSelectModel } from "drizzle-orm";
import {
    pgTable,
    serial,
    text
} from "drizzle-orm/pg-core";
import { db } from "../../../shared/src/db.js";
import { Argon2id } from "oslo/password";

export const User = pgTable("user", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email"),
    password: text("password"),

    googleId: text("googleId") // ,
    // discordId: text("discordId"),
    // githubId: text("githubId")
});

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

export async function createUserFromCreds (email: string,  password: string): Promise<UserDoc|null> {
    const hash = await(new Argon2id()).hash(password);
    const user: Partial<UserDoc> = {
        email,
        password: hash
    };

    if (!getUserFromEmail(email)) return null;

    db.insert(User).values(user);

    // const userDoc = await db.query.user.findFirst({ where: eq(User.email, email) });
    // console.log(userDoc);
    // return userDoc ?? user as UserDoc;
    return user as UserDoc;
}

export async function getUserFromEmail (email: string): Promise<UserDoc> {
    const user = await db.query.user.findFirst({ where: eq(User.email, email) });
    return user as UserDoc;
}

export async function getUserFromGoogleId (googleId: string): Promise<UserDoc | null> {
    const user = await db.query.user.findFirst({ where: eq(User.googleId, googleId) });
    return user ?? null;
}
