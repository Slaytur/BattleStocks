import { drizzle } from "drizzle-orm/node-postgres";

import type { User } from "./models/User.js";
import type { Session } from "./models/Session.js";

export const db = drizzle<{ user: typeof User, session: typeof Session }>(process.env.DATABASE_URL);
