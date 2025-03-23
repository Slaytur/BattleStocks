<script lang="ts">
    import { applyAction } from "$app/forms";
    import type { Server } from "../../../../../shared/typings/types";

    import { AppState } from "./app.svelte";
    import { core } from "./core.svelte";
</script>

<div class="server-browser card card-body tw:w-1/2 tw:mx-auto tw:mt-5">
    {#if core.app.state === AppState.Initial}
        <h2 class="tw:!my-5 tw:text-center">Setup</h2>
        <div class="tw:mb-4 tw:text-center">
            <input bind:value={core.app.playerName} type="text" name="player-name" id="player-name" class="form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70 tw:mb-2" placeholder="Enter your name here" maxlength={32} />
            <hr>
            <button class="btn btn-success btn-block tw:w-full" disabled={core.app.playerName === ""} onclick={(() => core.app.state = AppState.ServerBrowser)}>View Servers</button>
        </div>
    {:else if core.app.state === AppState.ServerBrowser}
        <h2 class="tw:!my-5 tw:text-center">Server Browser</h2>
        <div class="d-grid gap-2">
            <div class="row tw:font-bold tw:!mx-1">
                <div class="col">Name</div>
                <div class="col-sm-2">Players</div>
                <div class="col-sm-2">Phases</div>
                <div class="col-sm-2"></div>
            </div>
            {#each core.app.servers as server}
                <div class="row tw:!mx-1">
                    <div class="col">{server.name}</div>
                    <div class="col-sm-2">0</div>
                    <div class="col-sm-2">{server.phases}</div>
                    <div class="col-sm-2">
                        <button onclick={(() => core.app.joinServer(server.gameId))} class="btn btn-block tw:!bg-secondary tw:!text-white tw:flex tw:flex-row tw:items-center">
                            Join Game
                        </button>
                    </div>
                </div>
            {/each}
            <hr>
        </div>
        <button class="btn btn-success btn-block tw:w-full" disabled={core.app.playerName === "" || !core.app.checkedForServers} onclick={(() => core.app.state = AppState.Creating)}>
            {#if !core.app.checkedForServers}
                <div class="ui-spinner"></div>
            {:else}
                Create Server
            {/if}
        </button>
    {:else}
        <div class="d-grid gap-2">
            <div class="row">
                <div class="col">
                    <label for="email" class="form-label tw:text-text-dark">Server Name</label>
                    <input bind:value={core.app.serverName} name="name" id="name" class="form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70" placeholder="An Awesome Server" />
                </div>
                <div class="col-sm-4">
                    <label for="pin" class="form-label tw:text-text-dark" style="visibility: hidden;">Server PIN</label>
                    <div class="input-group">
                        <span class="input-group-text">Server PIN</span>
                        <input bind:value={core.app.serverPIN} name="pin" id="pin" class="form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70" placeholder="1234" />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <label for="phases" class="form-label tw:text-text-dark">Number of Phases</label>
                    <input type="range" min=2 max=10 bind:value={core.app.serverPhases} name="phases" id="phases" class="tw:text-center form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70 tw:accent-emerald-600" placeholder="Server Name" />
                    <input type="number" min=2 max=10 bind:value={core.app.serverPhases} name="phases" id="phases" class="tw:!w-[80px] tw:!mx-auto tw:!my-2 tw:text-center form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70 tw:accent-emerald-600" placeholder="Server Name" />
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-success btn-block tw:w-full" disabled={core.app.serverName === "" || core.app.serverPIN.length < 4 || core.app.accessingServer} onclick={(() => { core.app.createServer(); })}>
                        {#if core.app.accessingServer}
                            <div class="ui-spinner"></div>
                        {:else}
                            Confirm
                        {/if}
                    </button>
                </div>
            </div>
            <div class="row">
                <div class="col">
                    <button class="btn btn-secondary btn-block tw:w-full" disabled={core.app.playerName === ""} onclick={(() => { core.app.goBack(); })}>Go Back</button>
                </div>
            </div>
        </div>
    {/if}
</div>
<!-- ss btn-block tw:w-full onclick={()}View Servers</div> -->

<style lang="scss">

</style>
