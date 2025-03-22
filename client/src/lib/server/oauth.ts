import {
    Discord as DiscordStrategy,
    GitHub as GitHubStrategy,
    Google as GoogleStrategy
} from "arctic";

import {
    DISCORD_CLIENT_ID,
    DISCORD_CLIENT_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    ENV
} from "$env/static/private";

const callbackStub = ENV === "production"
    ? "https://snoopies-wics.io"
    : "http://localhost:3000";

// todo: dynamic URI for dev / prod
export const Discord = new DiscordStrategy(DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, `${callbackStub}/login/discord/callback`);
export const Github = new GitHubStrategy(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, `${callbackStub}/login/github/callback`);
export const Google = new GoogleStrategy(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, `${callbackStub}/login/google/callback`);
