import { decodeIdToken, type OAuth2Tokens } from "arctic";

import { Google } from "$lib/server/oauth";
import { createUserFromGoogle, getUserFromGoogleId } from "../../../../../../shared/src/modules/User";
import { createSession, generateSessionToken, setSessionTokenCookie } from "$lib/server/session";

import type { RequestEvent } from "./$types";

export async function GET (event: RequestEvent): Promise<Response> {
    const storedState = event.cookies.get("google_oauth_state") ?? null;
    const codeVerifier = event.cookies.get("google_code_verifier") ?? null;
    const code = event.url.searchParams.get("code");
    const state = event.url.searchParams.get("state");

    if (storedState === null || codeVerifier === null || code === null || state === null) {
        return new Response("Please restart the process.", {
            status: 400
        });
    }

    if (storedState !== state) {
        return new Response("Please restart the process.", {
            status: 400
        });
    }

    let tokens: OAuth2Tokens;
    try {
        tokens = await Google.validateAuthorizationCode(code, codeVerifier);
    } catch (err) {
        if (err) console.error(err);
        return new Response("Please restart the process.", {
            status: 400
        });
    }

    // todo: fix any
    const claims: any = decodeIdToken(tokens.idToken());

    const googleId = claims.googleId; // claimsParser.getString("sub");
    const name = claims.name; // claimsParser.getString("name");
    const picture = claims.picture; // claimsParser.getString("picture");
    const email = claims.email; // claimsParser.getString("email");

    const existingUser = getUserFromGoogleId(googleId);
    if (existingUser !== null) {
        const sessionToken = generateSessionToken();
        const session = createSession(sessionToken, existingUser.id);

        setSessionTokenCookie(event, sessionToken, (await session).expiresAt);
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/"
            }
        });
    }

    const user = createUserFromGoogle(googleId, email, name, picture);
    const sessionToken = generateSessionToken();
    const session = createSession(sessionToken, (await user).id);

    setSessionTokenCookie(event, sessionToken, (await session).expiresAt);
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/"
        }
    });
}
