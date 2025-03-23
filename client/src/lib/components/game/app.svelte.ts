import { WSClientMessageTypes, WSServerMessageTypes, type Server, type WSServerMessages } from "../../../../../shared/typings/types";

export enum AppState {
    Initial,
    ServerBrowser,
    Joining,
    Lobby,
    Queuing,
    Playing,
    GameOver
}

export class Application {
    state = AppState.ServerBrowser;

    ws: WebSocket | null = null;
    servers: Server[] = [];

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
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.error(`Error parsing message: ${event.data}`);
            }
        };
        
        this.ws.onclose = () => {};
    }
}

window.addEventListener(`hashchange`, () => {});

// window.addEventListener(`beforeunload`, e => {
//     const dialogText = `Do you want to reload the game? Your progress will be lost.`;
//     e.returnValue = dialogText;
//     return dialogText;
// });
