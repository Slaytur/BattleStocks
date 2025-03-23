<script lang="ts">
    import Stocks from "./Stocks.svelte";
    import { Chart } from "chart.js/auto";

    import events from "../../../../../shared/data/events.json";
    import scenarios from "../../../../../shared/data/scenarios.json";
    import stocks from "../../../../../shared/data/stocks.json";

    import { core } from "./core.svelte";
  import { AppState } from "./app.svelte";

    // variables for ben to use for the graphs
    let var1;
    let var2;
    let var3;

    let event: string;
    let news: string;

    let event1;
    let event3;
    let event2;
    let payload;

    let graph: HTMLCanvasElement;

    const player = $derived(core.app.game?.players.find(player => player.id === core.app.playerId));

    function getEvents () {
    }

    function draw () {
        const data = [
            { year: 2010, count: 10 },
            { year: 2011, count: 29 },
            { year: 2012, count: 15 },
            { year: 2013, count: 22 },
            { year: 2014, count: 30 }
        ];

        new Chart(
            graph,
            {
                type: "bar",
                data: {
                    labels: data.map(row => row.year),
                    datasets: [
                        {
                            label: "year",
                            data: data.map(row => row.count)
                        }
                    ]
                }
            }
        );
    }
</script>

<div class="lobby">
    <div class="d-grid gap-2"></div>
</div>
<div class="game-ui tw:m-8">
    <div class="game-ui-announcer card">
        {#if core.app.game?.currentPhase === 0}
            <div class="card-header">
                <span class="announcer-title">{scenarios[core.app.game.event].title}</span>
            </div>
            <div class="card-body">
                <span class="announcer-desc">{scenarios[core.app.game.event].description}</span>
            </div>
        {:else}
            <div class="card-body">
                <span class="announcer-desc">{events[core.app.game!.event].text}</span>
                <div class="announcer-events grid gap-2">
                    {#each Object.entries(events[core.app.game!.event].effects) as [title, effects]}
                        <div class="row">
                            <div class="col"><strong>{title}</strong></div>
                            <div class="col"><em>DRIFT:</em> {effects.drift}</div>
                            <div class="col"><em>VOLATILITY:</em> {effects.volatility}</div>
                            <div class="col"><em>JUMP:</em> {effects.jump}</div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
    <hr>
    {#if core.app.state == AppState.Lobby}
        <button onclick={() => core.app.startGame()}>Start Game</button>
    {:else}
        <div class="d-grid gap-2 tw:my-4">
            <div class="row">
                <div class="col-sm-2">
                    <div class="card">
                        <div class="card-header">Your Stocks</div>
                        <div class="card-body">
                            {#each player!.stocks as stock}
                                <section class="card tw:border-[#111211] tw:p-6">
                                    <div class="container" id="events"></div>
                                    <div><canvas bind:this={graph} class="container" width="600" height="400" ></div>
                                    <div class="container" id="news"></div>
                                </section>
                                <section class="card tw:border-[#111211] tw:p-6" id="stocks">
                                    <Stocks stock={(stocks as any)[0]} shares={stock[1]} />
                                </section>
                            {/each}
                        </div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">Market Trends</div>
                        <div class="card-body"></div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="card">
                        <div class="card-header">Leaderboard</div>
                        <div class="card-body"></div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
</div>

<style lang="scss">
    .game-ui-announcer {
        background: #f08989;
        border-color: #ff0000;
    }

    .announcer-title {
        font-weight: 600;
        font-size: 1.5rem;
        text-align: center;
    }

</style>
