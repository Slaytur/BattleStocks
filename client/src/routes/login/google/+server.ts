import { generateCodeVerifier, generateState } from "arctic";

import { Google } from "$lib/server/oauth";

import type { RequestEvent } from "./$types";

export function GET (event: RequestEvent): Response {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    const url = Google.createAuthorizationURL(state, codeVerifier, ["openid", "profile", "email"]);

    event.cookies.set("google_oauth_state", state, {
        httpOnly: true,
        maxAge: 60 * 10,
        secure: import.meta.env.PROD,
        path: "/",
        sameSite: "lax"
    });

    event.cookies.set("google_code_verifier", codeVerifier, {
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
