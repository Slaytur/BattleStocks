import type { InferSelectModel } from "drizzle-orm";
import {
    pgTable,
    serial,
    text
} from "drizzle-orm/pg-core";

export const User = pgTable("user", {
    id: serial("id").primaryKey(),

    username: text("username"),
    token: text("token")
});

export type UserTable = InferSelectModel<typeof User>;
