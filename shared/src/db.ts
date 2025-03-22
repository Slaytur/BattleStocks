import { drizzle } from "drizzle-orm/node-postgres";

import { User } from "./models/User.js";
import { Session } from "./models/Session.js";

type Schema = { user: typeof User } & { session: typeof Session };

export const db = drizzle<Schema>(process.env.DATABASE_URL);
