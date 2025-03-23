import {
    GameState,
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
    accessingServer = $state(false);

    game: GameSnap | null = $state(null);
    playerId = $state(-1);

    connect () {
        this.ws = new WebSocket(`ws://localhost:8080/api/game`);

        this.ws.onopen = () => {
            setTimeout(() => {
                this.ws?.send(JSON.stringify({
                    type: WSClientMessageTypes.Handshake
                }));
            }, 1e3);
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
                        this.unpack(data.data);
                        break;
                    case WSServerMessageTypes.EventSelection:
                        this.currentEventOptions = data.options;
                        this.selectionPhase = true;
                        break;
                    case WSServerMessageTypes.GameOver:
                        this.winner = data.winner;
                        break;
                    case WSServerMessageTypes.Connect:
                        this.state = AppState.Lobby;
                        this.playerId = data.id;
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

        this.accessingServer = true;
    }

    joinServer (code: number) {
        if (!this.ws || this.ws.readyState === this.ws.CLOSED) this.connect();

        this.ws?.send(JSON.stringify({
            type: WSClientMessageTypes.Join,
            name: this.playerName,
            code
        } as WSClientMessages));
    }

    goBack () {
        this.ws?.close();
        
        this.accessingServer = false;
        this.checkedForServers = false;

        this.state = AppState.ServerBrowser;

        this.connect();
    }


    startGame () {
        this.ws?.send(JSON.stringify({
            type: WSClientMessageTypes.Start
        } as WSClientMessages));
    }

    updateStock (name: string, amount: number) {
        this.ws?.send(JSON.stringify({
            type: WSClientMessageTypes.UpdateStocks,
            name,
            amount
        } as WSClientMessages));
    }

    unpack (snap: GameSnap) {
        this.game = snap;
        this.state = 
            this.game.state === GameState.Lobby
                ? AppState.Lobby
                : this.game.state === GameState.BuyPhase || this.game.state === GameState.EventSelectionPhase
                ? AppState.Playing
                : this.game.state === GameState.GameOver
                    ? AppState.GameOver
                    : this.game.state === GameState.Queuing
                        ? AppState.Queuing
                        : this.state;
    }
}

window.addEventListener(`hashchange`, () => {});

// window.addEventListener(`beforeunload`, e => {
//     const dialogText = `Do you want to reload the game? Your progress will be lost.`;
//     e.returnValue = dialogText;
//     return dialogText;
// });
