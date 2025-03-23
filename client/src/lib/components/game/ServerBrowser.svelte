<script lang="ts">
    import type { Server } from "../../../../../shared/typings/types";

    let servers: Server[] = $state([
        { name: "Charlie's Server", phases: 10, gameId: "123" },
        { name: "Benjamin's Server", phases: 5, gameId: "213" },
        { name: "Ahan's Server", phases: 2, gameId: "132" },
        { name: "Quentin's Server", phases: 15, gameId: "231" }
    ]);
</script>

<div class="server-browser card card-body tw:w-1/2 tw:mx-auto tw:mt-5">
    <!-- Servers: {servers.length} -->
    <h2 class="tw:!my-5 tw:text-center">Server Browser</h2>
    <div class="tw:mb-4 tw:text-center">
        <input type="text" name="query" id="query" class="form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70 tw:mb-2" placeholder="Server name" />
        <hr>
    </div>
    <div class="d-grid gap-2">
        <div class="row tw:font-bold tw:!mx-1">
            <div class="col">Name</div>
            <div class="col-sm-2">Players</div>
            <div class="col-sm-2">Phases</div>
            <div class="col-sm-2"></div>
        </div>
        {#each servers as server}
            <div class="row tw:!mx-1">
                <div class="col">{server.name}</div>
                <div class="col-sm-2">0</div>
                <div class="col-sm-2">{server.phases}</div>
                <div class="col-sm-2">
                    <button onclick={() => window.location.href = `/game/${server.gameId}`} class="btn btn-block tw:!bg-secondary">
                        <div>Join Game</div>
                    </button>
                </div>
            </div>
        {/each}
        <hr>
        <div class="row tw:!mx-1">
            <button onclick={(() => window.open("/servers/create", "_self"))} class="btn btn-block tw:!bg-secondary tw:!text-white tw:!border-secondary tw:hover:brightness-50 tw:duration-300 tw:!transition-all">
                <div>Create Game</div>
            </button>
        </div>
    </div>
</div>

<style lang="scss">

</style>
