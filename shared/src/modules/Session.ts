import type { InferSelectModel } from "drizzle-orm";

import type { Session } from "../models/Session.js";

export type SessionDoc = InferSelectModel<typeof Session>;
