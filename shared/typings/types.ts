export type Server = {
    name: string
    gameId: number
    state: number
    phases: number
    players: number
};

export interface WSData {
    id: number
    gameId: number
}

export enum WSClientMessageTypes {
    Handshake,
    Create,
    Start,
    Join,
    UpdateStocks,
    ChooseEvent
}

export enum WSServerMessageTypes {
    Handshake,
    Connect,
    EventSelection,
    Snapshot,
    GameOver
}

export type WSClientMessages =
    | { type: WSClientMessageTypes.Handshake }
    | { type: WSClientMessageTypes.Create, playerName: string, serverName: string, serverPhases: number, serverPIN: string }
    | { type: WSClientMessageTypes.Start }
    | { type: WSClientMessageTypes.Join, name: string, code: number }
    | { type: WSClientMessageTypes.UpdateStocks, name: string, amount: number }
    | { type: WSClientMessageTypes.ChooseEvent, id: number };

export type WSServerMessages =
    | { type: WSServerMessageTypes.Handshake, games: Game[] }
    | { type: WSServerMessageTypes.Connect, id: number, gameId: number }
    | { type: WSServerMessageTypes.EventSelection, options: number[] }
    | { type: WSServerMessageTypes.Snapshot, data: any }
    | { type: WSServerMessageTypes.GameOver, winner: string }

export interface PlayerSnap {
    name: string
    state: number
    rank: number
    balance: number
    db: number
}

export interface StockSnap {
    name: string
    category: string
    history: number[]
    value: number
    prevValue: number
    oneMonthAvg: number
    oneMonthMin: number
    oneMonthPERatio: number
    twoMonthPERatio: number
}

export interface GameSnap {
    state: number
    players: PlayerSnap[]
    stocks: StockSnap[]
    timer: number
}

export type Unpacked<T> = T extends Array<infer U> ? U : T;
