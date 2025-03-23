<script>
    import ServerBrowser from "$lib/components/game/ServerBrowser.svelte";
    import GameUI from "$lib/components/game/GameUI.svelte";
    import GameOver from "$lib/components/game/GameOver.svelte";

    import { core } from "$lib/components/game/core.svelte";
    import { AppState } from "$lib/components/game/app.svelte";
    import Overlay from "$lib/components/game/Overlay.svelte";
</script>

{#if
    core.app.state === AppState.Initial
    || core.app.state === AppState.ServerBrowser
        || core.app.state === AppState.Creating
    || core.app.state === AppState.Joining
}
    <ServerBrowser />
{:else if
    core.app.state === AppState.Lobby
    || core.app.state === AppState.Queuing
        || core.app.state === AppState.Playing
}
    <GameUI />
{:else}
    <GameOver />
{/if}
