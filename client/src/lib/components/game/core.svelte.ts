import { Application } from "./app.svelte";

export const core = $state({
    app: new Application()
});

export interface Core {
    app: Application
}

core.app.connect();
