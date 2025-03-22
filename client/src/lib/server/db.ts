import { drizzle } from "drizzle-orm/node-postgres";

import { User } from "./schema/User";
import { Session } from "./schema/Session";

type Schema = { user: typeof User } & { session: typeof Session };

export const db = drizzle<Schema>(process.env.DATABASE_URL);
