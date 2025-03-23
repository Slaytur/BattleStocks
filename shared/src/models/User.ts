import {
    pgTable,
    serial,
    text
} from "drizzle-orm/pg-core";

export const User = pgTable("user", {
    id: serial("id").primaryKey(),
    email: text("email")
        .notNull()
        .unique(),

    name: text("name"),
    password: text("password"),

    googleId: text("googleId"),
    discordId: text("discordId"),
    githubId: text("githubId")
});
