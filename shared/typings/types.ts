export type Server = {
    name: string
    gameId: number
    phases: number
};

export interface WSData {
    id: number
    gameId: number
}

export enum WSClientMessageTypes {
    Create,
    Join,
    GamesList,
    UpdateStocks,
    ChooseEvent
}

export enum WSServerMessageTypes {
    Handshake,
    Connect,
    Snapshot
}

export type WSClientMessages =
    | { type: WSClientMessageTypes.Create, name: string, phases: number }
    | { type: WSClientMessageTypes.Join, name: string, code: number }
    | { type: WSClientMessageTypes.UpdateStocks, name: string, amount: number }
    | { type: WSClientMessageTypes.ChooseEvent, id: number }
    | { type: WSClientMessageTypes.GamesList, servers: Server[] };

export type WSServerMessages =
    | { type: WSServerMessageTypes.Handshake, games: Game[] }
    | { type: WSServerMessageTypes.Connect, id: number, gameId: number }
    | { type: WSServerMessageTypes.Snapshot, data: any };

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
