import {
    pgTable,
    serial,
    text
} from "drizzle-orm/pg-core";

export const User = pgTable("user", {
    id: serial("id").primaryKey(),
    // name: text("name"),
    email: text("email"),
    password: text("password"),

    // googleId: text("googleId") // ,
    // discordId: text("discordId"),
    // githubId: text("githubId")
});
