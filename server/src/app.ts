import { Hono } from "hono";

import { cors } from "hono/cors";
import { createBunWebSocket } from "hono/bun";
import { WSContext } from "hono/ws";

import { WSData, WSMessageType, type WSMessages } from "../../shared/typings/types";

import type { ServerWebSocket } from "bun";
import { core } from "./core";
import { Game, GameState } from "./game/Game";
import { Player, PlayerRank } from "./game/Player";

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

app.get("/api/game", upgradeWebSocket(c => ({
    onOpen (e, ws) {
        core.logger.info("WebSocket", "Player connected.");
        
        ws.send(JSON.stringify({
            type: WSMessageType.GamesList,
            games: [{ name: "game", gameId: 123, phases: 5 }]
        }));
    },

    // @ts-expect-error We know that this is a Bun WebSocket.
    onMessage (e, ws: WSContext<ServerWebSocket<WSData>>) {
        const data = e.data as unknown as WSMessages;

        if (data.type === WSMessageType.Create) {
            if (typeof data.name !== "string") return;

            const gameId = core.gameAllocator.getNextId();
            const game = new Game(gameId, data.name, data.phases);

            if (game.state !== GameState.Lobby) return; // todo: error handling

            const player = new Player(gameId, ws, data.name);
            player.rank = PlayerRank.Host;

            if (ws.raw) ws.raw.data.id = player.id;

            game.addPlayer(player);
            core.games.set(gameId, game);
        } else if (data.type === WSMessageType.Join) {
            if (typeof data.code !== "string" || typeof data.name !== "string") return;

            const game = core.games.get(data.code);
            if (!game || game.state !== GameState.Lobby) return; // todo: error handling

            const player = new Player(data.code, ws, data.name);
            game.addPlayer(player);
        } else if (data.type === WSMessageType.UpdateStocks) {
            if (typeof data.name !== "string" || typeof data.amount !== "string" || !ws.raw) return;

            const game = core.games.get(ws.raw.data.gameId);
            if (!game) return;

            const player = game.players.get(ws.raw.data.id);
            const stock = game.stocks.get(data.name);

            if (!player || !stock) return;

            const success = data.amount > 0
                ? player?.buyStocks(stock, data.amount)
                : player?.sellStocks(stock, -data.amount);
        } else if (data.type === WSMessageType.ChooseEvent) {
            if (typeof data.id !== "number") return;

            const player = getPlayer(ws);
            player?.chooseEvent(data.id);
        }
    },

    // @ts-expect-error We know that this is a Bun WebSocket.
    onClose (e, ws: WSContext<ServerWebSocket<WSData>>) {
        const game = core.games.get(ws.raw!.data.gameId);
        game?.removePlayer(ws.raw!.data.id);
    }
})));

const getPlayer = (ws: WSContext<ServerWebSocket<WSData>>): Player | undefined => {
    const game = core.games.get(ws.raw!.data.gameId);
    if (!game) return;

    const player = game.players.get(ws.raw!.data.id);
    return player;
};

Bun.serve({
    fetch: app.fetch,
    websocket,
    port: 8080
});
