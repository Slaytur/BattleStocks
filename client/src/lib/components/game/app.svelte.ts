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

    connect () {
        this.ws = new WebSocket(`ws://${window.location.host}/api/game`);

        this.ws.onopen = () => {};

        this.ws.onmessage = () => {};
        
        this.ws.onclose = () => {};
    }
}

window.addEventListener(`hashchange`, () => {});

window.addEventListener(`beforeunload`, e => {
    const dialogText = `Do you want to reload the game? Your progress will be lost.`;
    e.returnValue = dialogText;
    return dialogText;
});
