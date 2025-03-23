import type { InferSelectModel } from "drizzle-orm";

import { Session } from "../models/Session.js";

export type SessionDoc = InferSelectModel<typeof Session>;
