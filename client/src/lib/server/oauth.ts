import {
    Discord as DiscordStrategy,
    Google as GoogleStrategy,
    GitHub as GitHubStrategy
} from "arctic";

import {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECERT,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECERT,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    PROD
} from "$env/static/private";

const callbackStub = PROD
    ? "https://snoopies-wics.io"
    : "http://localhost:3000";

// todo: dynamic URI for dev / prod
export const Discord = new DiscordStrategy(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECERT, `${callbackStub}/login/discord/callback`);
export const Google = new GoogleStrategy(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECERT, `${callbackStub}/login/google/callback`);
export const Github = new GitHubStrategy(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, `${callbackStub}/login/github/callback`);
