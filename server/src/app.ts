import { Hono } from "hono";

import { cors } from "hono/cors";
import { createBunWebSocket } from "hono/bun";
import { WSContext } from "hono/ws";

import { WSData, WSClientMessageTypes, type WSClientMessages, WSServerMessages, WSServerMessageTypes, Server } from "../../shared/typings/types";

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
    },

    // @ts-expect-error We know that this is a Bun WebSocket.
    onMessage (e: MessageEvent<WSClientMessages>, ws: WSContext<ServerWebSocket<WSData>>) {
        switch (e.data.type) {
            case WSClientMessageTypes.Handshake: {
                ws.send(JSON.stringify({
                    type: WSServerMessageTypes.Handshake,
                    games: getServers()
                } as WSServerMessages));
                break;
            }

            case WSClientMessageTypes.Create: {
                if (typeof e.data.name !== "string") return;

                const gameId = core.gameAllocator.getNextId();
                const game = new Game(gameId, e.data.name, e.data.phases);

                if (game.state !== GameState.Lobby) return; // todo: error handling

                const player = new Player(gameId, ws, e.data.name);
                player.rank = PlayerRank.Host;

                if (ws.raw) ws.raw.data.id = player.id;

                game.addPlayer(player);
                core.games.set(gameId, game);
                break;
            }

            case WSClientMessageTypes.Join: {
                if (typeof e.data.code !== "string" || typeof e.data.name !== "string") return;

                const game = core.games.get(e.data.code);
                if (!game || game.state !== GameState.Lobby) return; // todo: error handling

                const player = new Player(e.data.code, ws, e.data.name);
                game.addPlayer(player);
                break;
            }

            case WSClientMessageTypes.UpdateStocks: {
                if (typeof e.data.name !== "string" || typeof e.data.amount !== "string" || !ws.raw) return;

                const game = core.games.get(ws.raw.data.gameId);
                if (!game) return;

                const player = game.players.get(ws.raw.data.id);
                const stock = game.stocks.get(e.data.name);

                if (!player || !stock) return;

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const success = e.data.amount > 0
                    ? player?.buyStocks(stock, e.data.amount)
                    : player?.sellStocks(stock, -e.data.amount);
                break;
            }

            case WSClientMessageTypes.ChooseEvent: {
                if (typeof e.data.id !== "number") return;

                const player = getPlayer(ws);
                player?.chooseEvent(e.data.id);
                break;
            }
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

const getServers = (): Server[] => {
    const servers: Server[] = [];

    for (const game of [...core.games.values()]) servers.push(game.serverSnap());
    return servers;
};

export const sendGameSnap = (game: Game) => {
    const snap = game.snap();

    for (const player of [...game.players.values()]) {
        player.ws.raw?.send(JSON.stringify({
            type: WSServerMessageTypes.Snapshot,
            data: snap
        } as WSServerMessages));
    }
};

Bun.serve({
    fetch: app.fetch,
    websocket,
    port: 8080
});
