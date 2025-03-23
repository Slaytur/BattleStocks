import { eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../shared/src/db.js";

import { Session } from "../models/Session.js";
import type { UserDoc } from "./User.ts";

export type SessionDoc = InferSelectModel<typeof Session>;

export const createSessionFromUser = async (user: UserDoc): Promise<SessionDoc | null> => {
    const session: typeof Session.$inferInsert = {
        userId: user.id,
        expiresAt: new Date()
    };

    if (await getSessionFromUserId(session.userId)) return null;

    const res = await db.insert(Session).values(session);

    return res;
};

export async function getSessionFromUserId (userId: number): Promise<SessionDoc | null> {
    const session = await db.select().from(Session).where(eq(Session.userId, userId));
    return session[0] as SessionDoc;
}
