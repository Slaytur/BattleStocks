import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    out: "./src/drizzle",

    dbCredentials: {
        url: process.env.DATABASE_URL!
    },

    strict: true,
    verbose: true
});
