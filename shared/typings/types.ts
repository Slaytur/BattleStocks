export type Server = {
    name: string
    gameId: string
    phases: number
};

export interface WSData {
    id: number
    gameId: number
}

export enum WSMessageType {
    Create,
    Join,
    UpdateStocks,
    ChooseEvent
}

export type WSMessages =
    | { type: WSMessageType.Create, name: string }
    | { type: WSMessageType.Join, name: string, code: number }
    | { type: WSMessageType.UpdateStocks, name: string, amount: number }
    | { type: WSMessageType.ChooseEvent, id: number };

export type Unpacked<T> = T extends Array<infer U> ? U : T;
