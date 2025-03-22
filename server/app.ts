import { Hono } from "hono";

import { cors } from "hono/cors";
import { createBunWebSocket } from "hono/bun";

import type { ServerWebSocket } from "bun";
import { core } from "./core";

export const app = new Hono();
export const { upgradeWebSocket, websocket } = createBunWebSocket();

app.use(
    "/api/*",
    cors({
        origin: "*",
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Origin", "Content-Type", "Accept", "X-Requested-With"],
        maxAge: 3600
    })
);

app.get("/game", upgradeWebSocket(c => ({
    onOpen (e, ws) {
        core.logger.info(`WebSocket`, `Player connected.`);
    },
    onMessage (e, ws) {},
    onClose (e, ws) {}
})));

Bun.serve({
    fetch: app.fetch,
    websocket,
    port: 8080
});
