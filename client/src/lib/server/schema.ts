import type { InferSelectModel } from "drizzle-orm";
import {
    integer,
    pgTable,
    serial,
    text,
    timestamp
} from "drizzle-orm/pg-core";

export const User = pgTable("user", {
    id: serial("id").primaryKey(),

    username: text("username"),
    token: text("token")
});

export const Session = pgTable("session", {
    id: text("id").primaryKey(),
    userId: integer("user_id")
        .notNull()
        .references(() => User.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});

export type UserTable = InferSelectModel<typeof User>;
export type SessionTable = InferSelectModel<typeof Session>;
