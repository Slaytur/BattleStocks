import { eq, type InferSelectModel } from "drizzle-orm";
import {
    pgTable,
    serial,
    text
} from "drizzle-orm/pg-core";
import { db } from "../../../shared/src/db.js";

export const User = pgTable("user", {
    id: serial("id").primaryKey(),
    name: text("name"),
    email: text("email"),

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

export async function getUserFromGoogleId (googleId: string): Promise<UserDoc | null> {
    const user = await db.query.user.findFirst({ where: eq(User.googleId, googleId) });
    return user ?? null;
}
