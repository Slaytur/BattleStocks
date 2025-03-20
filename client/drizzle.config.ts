import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/server/db/schema.ts",
    out: "./src/lib/server/db/drizzle",

    dbCredentials: {
        url: process.env.DATABASE_URL!
    },

    strict: true,
    verbose: true
});
