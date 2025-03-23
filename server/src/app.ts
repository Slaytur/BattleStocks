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
    onMessage (e: MessageEvent<string>, ws: WSContext<ServerWebSocket<WSData>>) {
        const data = JSON.parse(e.data) as WSClientMessages;
        switch (data.type) {
            case WSClientMessageTypes.Handshake: {
                ws.send(JSON.stringify({
                    type: WSServerMessageTypes.Handshake,
                    games: getServers()
                } as WSServerMessages));
                break;
            }

            case WSClientMessageTypes.Create: {
                if (
                    typeof data.playerName !== "string"
                    || typeof data.serverName !== "string"
                    || typeof data.serverPIN !== "string"
                    || typeof data.serverPhases !== "number"
                ) return;

                const gameId = core.gameAllocator.getNextId();
                const game = new Game(gameId, data.serverName, data.serverPhases);

                if (game.state !== GameState.Lobby) return; // todo: error handling

                const player = new Player(gameId, ws, data.playerName);
                player.rank = PlayerRank.Host;

                if (ws.raw) ws.raw.data.id = player.id;
                core.logger.debug("WebSocket", `Creating game #${gameId}.`);

                game.addPlayer(player);
                core.games.set(gameId, game);

                ws.send(JSON.stringify({
                    type: WSServerMessageTypes.Connect,
                    id: player.id,
                    game: game.snap()
                } as WSServerMessages));

                sendGameSnap(game);
                break;
            }

            case WSClientMessageTypes.Start: {
                const gameId = ws.raw?.data.id;
                const game = core.games.get(gameId!);

                if (!game) return;
                break;
            }

            case WSClientMessageTypes.Join: {
                if (typeof data.code !== "string" || typeof data.name !== "string") return;

                const game = core.games.get(data.code);
                if (!game || game.state !== GameState.Lobby) return; // todo: error handling

                const player = new Player(data.code, ws, data.name);
                game.addPlayer(player);
                break;
            }

            case WSClientMessageTypes.UpdateStocks: {
                if (typeof data.name !== "string" || typeof data.amount !== "string" || !ws.raw) return;

                const game = core.games.get(ws.raw.data.gameId);
                if (!game) return;

                const player = game.players.get(ws.raw.data.id);
                const stock = game.stocks.get(data.name);

                if (!player || !stock) return;

                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const success = data.amount > 0
                    ? player?.buyStocks(stock, data.amount)
                    : player?.sellStocks(stock, -data.amount);
                break;
            }

            case WSClientMessageTypes.ChooseEvent: {
                if (typeof data.id !== "number") return;

                const player = getPlayer(ws);
                player?.chooseEvent(data.id);
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
        player.ws.send(JSON.stringify({
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
