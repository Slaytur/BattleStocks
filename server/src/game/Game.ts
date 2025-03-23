import { Player, PlayerRank } from "./Player";
import { Stock } from "./Stock";

import { core } from "../core";

import { IDAllocator } from "../../../shared/src/utils/IDAllocator";
import { randInt } from "../../../shared/src/utils/math";

import events from "../../../shared/data/events.json";

import { Server, WSServerMessageTypes } from "../../../shared/typings/types";

export enum GameState {
    Lobby,
    Queuing,
    BuyPhase,
    EventSelectionPhase,
    GameOver
}

export class Game {
    state = GameState.Lobby;
    players = new Map<number, Player>();

    timer = -1;

    stocks = new Map<string, Stock>();

    playerAllocator = new IDAllocator(8);

    eventOptions: number[] = [];

    constructor (public id: number, public name: string, public phases: number) {}

    /**
     * Runs every time that a websocket sends data.
     */
    logic () {
        if (this.timer >= 0) this.timer--;

        switch (this.state) {
            case GameState.Queuing: {
                if (this.timer < 0) {
                    this.timer = 5;
                }
                if (this.timer === 0){
                    this.state = GameState.BuyPhase;
                    this.timer = 90;
                }
                break;
            }
            case GameState.BuyPhase: {
                if (this.timer === 0) {
                    this.state = GameState.EventSelectionPhase;
                    this.timer = 30;
                    this.sendEventSelection();
                }
                break;
            }
            case GameState.EventSelectionPhase: {
                if (this.timer === 0) {
                    this.state = GameState.GameOver;
                    this.timer = 0;
                }
                break;
            }
            case GameState.GameOver: {
                break;
            }
        }
    }

    sendEventSelection() {
        for (const player of [...this.players.values()]) {
            player.ws.send(JSON.stringify({
                type: WSServerMessageTypes.EventSelection,
                options: this.eventOptions
            }));
        }
    }

    addPlayer (player: Player) {
        const playerId = this.playerAllocator.getNextId();
        player.id = playerId;

        this.players.set(playerId, player);
    }

    removePlayer (id: number) {
        const player = this.players.get(id)!;

        this.players.delete(id);
        this.playerAllocator.give(id);

        if (player.rank === PlayerRank.Host) this.destroy();
    }

    selectRandomEvents () {
        const eventList = events;
        const len = eventList.length;

        this.eventOptions.length = 0;
        for (let i = 0; i < 3; i++) {
            const index = randInt(0, len - i);
            this.eventOptions.push(index);

            eventList.splice(index, 1);
        }
    }

    destroy () {
        for (const player of [...this.players.values()]) player.ws.close();
        core.games.delete(this.id);
        core.gameAllocator.give(this.id);
    }

    serverSnap (): Server {
        return {
            name: this.name,
            gameId: this.id,
            state: this.state,
            phases: this.phases,
            players: this.players.size
        };
    }

    snap () {
        const players = [];
        const stocks = [];

        for (const player of [...this.players.values()]) players.push(player.snap());
        for (const stock of [...this.stocks.values()]) stocks.push(stock.snap());

        return {
            state: this.state,
            players,
            stocks,
            timer: this.timer
        };
    }
}
