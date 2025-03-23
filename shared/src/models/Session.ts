import {
    integer,
    pgTable,
    serial,
    text,
    timestamp
} from "drizzle-orm/pg-core";

import { User } from "./User";

export const Session = pgTable("session", {
    id: serial("id").primaryKey(),
    sessionId: text("sessionId")
        .notNull(),
    userId: integer("user_id")
        .notNull()
        .references(() => User.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});
