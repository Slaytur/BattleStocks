import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    out: "./src/drizzle",
    schema: "./src/models",

    dbCredentials: {
        url: process.env.DATABASE_URL!
    },

    strict: true,
    verbose: true
});
