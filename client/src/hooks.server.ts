import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

import {
    validateSessionToken,
    setSessionTokenCookie,
    deleteSessionTokenCookie
} from "./lib/server/session";
import { TokenBucketRateLimit } from "../../shared/src/utils/TokenBucketRateLimit";

const bucket = new TokenBucketRateLimit<string>(100, 1);

const rateLimitHandle: Handle = async ({ event, resolve }) => {
    const clientIP = event.request.headers.get("X-Forwarded-For");
    if (clientIP === null) return resolve(event);

    const cost = event.request.method === "GET" || event.request.method === "OPTIONS"
        ? 1
        : 3;

    if (!bucket.consume(clientIP, cost)) {
        return new Response("Too many requests", {
            status: 429
        });
    }

    return resolve(event);
};

const authHandle: Handle = async ({ event, resolve }) => {
    const token = event.cookies.get("session") ?? null;
    if (token === null) {
        event.locals.user = null;
        event.locals.session = null;

        return resolve(event);
    }

    const { session, user } = await validateSessionToken(token);

    if (session !== null) setSessionTokenCookie(event, token, session.expiresAt);
    else deleteSessionTokenCookie(event);

    event.locals.session = session;
    event.locals.user = user;

    return resolve(event);
};

export const handle = sequence(rateLimitHandle, authHandle);
