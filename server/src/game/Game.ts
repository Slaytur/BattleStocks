import { Player, PlayerRank } from "./Player";
import { Stock } from "./Stock";

import { core } from "../core";

import { IDAllocator } from "../../../shared/src/utils/IDAllocator";
import { randInt } from "../../../shared/src/utils/math";

import events from "../../../shared/data/events.json";
import { Unpacked } from "../../../shared/typings/types";

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

    timer = 0;

    stocks = new Map<string, Stock>();

    playerAllocator = new IDAllocator(8);

    eventOptions: number[] = [];

    constructor (public id: number) {}

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
}
