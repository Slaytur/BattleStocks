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

export enum GameState {
    Lobby,
    Queuing,
    BuyPhase,
    EventSelectionPhase,
    GameOver
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
    | { type: WSServerMessageTypes.Handshake, games: Server[] }
    | { type: WSServerMessageTypes.Connect, id: number, game: GameSnap }
    | { type: WSServerMessageTypes.EventSelection, options: number[] }
    | { type: WSServerMessageTypes.Snapshot, data: GameSnap }
    | { type: WSServerMessageTypes.GameOver, winner: string };

export interface PlayerSnap {
    id: number
    name: string
    state: number
    rank: number
    balance: number
    db: number
    stocks: Array<[string, number]>
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
    id: number
    state: number
    players: PlayerSnap[]
    currentPhase: number
    event: number
    stocks: StockSnap[]
    timer: number
}

export type Unpacked<T> = T extends Array<infer U> ? U : T;
