import type { InferSelectModel } from "drizzle-orm";
import {
    integer,
    pgTable,
    text,
    timestamp
} from "drizzle-orm/pg-core";

import { User } from "./User.js";

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

export type SessionDoc = InferSelectModel<typeof Session>;
