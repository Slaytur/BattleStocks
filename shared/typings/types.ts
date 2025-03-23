export type Server = {
    name: string
    gameId: number
    phases: number
};

export interface WSData {
    id: number
    gameId: number
}

export enum WSMessageType {
    Create,
    Join,
    GamesList,
    UpdateStocks,
    ChooseEvent
}

export type WSMessages =
    | { type: WSMessageType.Create, name: string, phases: number }
    | { type: WSMessageType.Join, name: string, code: number }
    | { type: WSMessageType.UpdateStocks, name: string, amount: number }
    | { type: WSMessageType.ChooseEvent, id: number }
    | { type: WSMessageType.GamesList, servers: Server[] };

export type Unpacked<T> = T extends Array<infer U> ? U : T;
