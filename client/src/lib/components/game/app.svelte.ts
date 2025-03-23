import {
    WSClientMessageTypes,
    WSServerMessageTypes,
    type GameSnap,
    type Server,
    type WSClientMessages,
    type WSServerMessages
} from "../../../../../shared/typings/types";

export enum AppState {
    Initial,
    ServerBrowser,
    Creating,
    Joining,
    Lobby,
    Queuing,
    Playing,
    GameOver
}

export class Application {
    state = $state(AppState.Initial);
    selectionPhase = $state(false);
    currentEventOptions = $state([0, 0, 0]);
    winner = $state("");

    ws: WebSocket | null = null;
    servers: Server[] = $state([]);

    playerName = $state("");

    serverName = $state("");
    serverPIN = $state("");
    serverPhases = $state(4);

    checkedForServers = $state(false);

    game!: GameSnap;

    connect () {
        this.ws = new WebSocket(`ws://localhost:8080/api/game`);

        this.ws.onopen = () => {
            this.ws?.send(JSON.stringify({
                type: WSClientMessageTypes.Handshake
            }));
        };

        this.ws.onmessage = (event: MessageEvent<string>) => {
            const data = JSON.parse(event.data) as WSServerMessages;
            try {
                switch (data.type) {
                    case WSServerMessageTypes.Handshake:
                        this.servers = data.games;
                        this.checkedForServers = true;
                        break;
                    case WSServerMessageTypes.Snapshot:
                        this.selectionPhase = false;
                        break;
                    case WSServerMessageTypes.EventSelection:
                        this.currentEventOptions = data.options;
                        this.selectionPhase = true;
                        break;
                    case WSServerMessageTypes.GameOver:
                        this.winner = data.winner;
                        break;
                    case WSServerMessageTypes.Connect:
                        this.unpack(data.game);
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.error(`Error parsing message: ${event.data}`);
            }
        };
        
        this.ws.onclose = () => {
            this.ws = null;
        };
    }

    createServer () {
        if (!this.ws || this.ws.readyState === this.ws.CLOSED) this.connect();

        this.ws?.send(JSON.stringify({
            type: WSClientMessageTypes.Create,
            playerName: this.playerName,
            serverName: this.serverName,
            serverPhases: this.serverPhases,
            serverPIN: this.serverPIN
        } as WSClientMessages));
    }

    joinServer (code: number) {
        if (!this.ws || this.ws.readyState === this.ws.CLOSED) this.connect();

        this.ws?.send(JSON.stringify({
            type: WSClientMessageTypes.Join,
            name: this.playerName,
            code
        } as WSClientMessages));
    }

    unpack (snap: GameSnap) {
        this.game = snap;
    }
}

window.addEventListener(`hashchange`, () => {});

// window.addEventListener(`beforeunload`, e => {
//     const dialogText = `Do you want to reload the game? Your progress will be lost.`;
//     e.returnValue = dialogText;
//     return dialogText;
// });
