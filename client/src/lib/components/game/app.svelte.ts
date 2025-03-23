import { WSMessageType, type Server } from "../../../../../shared/typings/types";

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
        this.ws = new WebSocket(`ws://${window.location.host}/api/game`);

        this.ws.onopen = () => {
        };

        this.ws.onmessage = (event) => {
            console.log(event.type);
            try {
                switch (event.data.type){
                    case WSMessageType.GamesList:
                        this.servers = JSON.parse(event.data.games);
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

window.addEventListener(`beforeunload`, e => {
    const dialogText = `Do you want to reload the game? Your progress will be lost.`;
    e.returnValue = dialogText;
    return dialogText;
});
