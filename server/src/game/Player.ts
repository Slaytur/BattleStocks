import { WSContext } from "hono/ws";

import { Stock } from "./Stock";

import events from "../../../shared/data/events.json";
import stocks from "../../../shared/data/stocks.json";

import { core } from "../core";

export enum PlayerState {
    Joining,
    Playing,
    Disconnected
}

export enum PlayerRank {
    Player,
    Host
}

export class Player {
    id!: number;

    balance = 1e4;
    db = 0;

    stocks = new Map<Stock["name"], number>();

    state = PlayerState.Joining;
    rank = PlayerRank.Player;

    votedEvent = -1;

    constructor (public gameId: number, public ws: WSContext, public name: string) {}

    buyStocks (stock: Stock, amount: number): boolean {
        const cost = stock.value * amount;
        if (cost > this.balance) return false;

        this.db -= cost;
        this.balance -= cost;

        return true;
    }

    sellStocks (stock: Stock, amount: number): boolean {
        const playerStock = this.stocks.get(stock.name);

        if (!playerStock || playerStock < amount) return false;

        this.stocks.set(stock.name, playerStock - amount);
        this.balance += stock.value * amount;

        return true;
    }

    chooseEvent (id: number): boolean {
        const game = core.games.get(this.gameId);
        if (!game) return false;

        if (!game.eventOptions.includes(id) || this.votedEvent !== -1) return false;
        this.votedEvent = id;

        return true;
    }

    prepForNextRound () {
        this.db = 0;
    }
}
