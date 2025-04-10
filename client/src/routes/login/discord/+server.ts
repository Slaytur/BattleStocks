import { Discord } from "$lib/server/oauth";

import { generateState } from "arctic";

import type { RequestEvent } from "./$types";

export function GET (event: RequestEvent): Response {
    const state = generateState();
    const url = Discord.createAuthorizationURL(state, null, ["identify", "email"]);

    event.cookies.set("discord_oauth_state", state, {
        httpOnly: true,
        maxAge: 60 * 10,
        secure: import.meta.env.PROD,
        path: "/",
        sameSite: "lax"
    });

    return new Response(null, {
        status: 302,
        headers: {
            Location: url.toString()
        }
    });
}
