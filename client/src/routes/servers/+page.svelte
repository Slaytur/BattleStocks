<script lang="ts">
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faDiscord, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
    import type { Server } from "../../../../shared/typing/types";

    import gsap from "gsap";
    import { onMount } from "svelte";
    import { redirect } from "@sveltejs/kit";

    let main: HTMLElement;

    let query: string = $state("");

    let servers: Server[] = [
        {name: "Charlie's Server", phases: 10, gameId: "123"}, 
        {name: "Benjamin's Server", phases: 5, gameId: "213"}, 
        {name: "Ahan's Server", phases: 2, gameId: "132"}
    ];

    onMount(() => {
        const ctx = gsap.context(() => {
            gsap.set(main, { y: -150, opacity: 0 });
            gsap.to(main, { y: 0, opacity: 1 });
        }, main);

        return () => ctx.revert();
    });
</script>

<main bind:this={main}>
    <h1 class="tw:!text-text tw:!my-10 tw:text-center">Server Browser</h1>
    <div class="tw:container tw:mx-auto tw:w-1/4">
        <div class="card tw:!bg-primary tw:!border-primary">
            <div class="card-body">
                <p class="tw:flex tw:justify-end">{servers.length}/4 servers open</p>
                <div class="tw:mb-4 tw:text-center">
                    <label for="email" class="form-label tw:text-text-dark">Search</label>
                    <input type="email" bind:value={query} name="query" id="query" class="form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70" placeholder="Server1" />
                </div>
                <form action="">
                    <div class="tw:mb-4 card tw:!text-text-white tw:!bg-white">
                        <ul class="tw:p-4 tw:flex tw:flex-col">
                            {#each servers as server}
                                <div class="tw:flex tw:justify-around tw:m-4 tw:items-center">
                                    <li>{server.name}</li>
                                    <button onclick={() => window.location.href = `/game/${server.gameId}`} class="btn btn-block tw:!bg-secondary tw:!text-white tw:!border-secondary tw:hover:brightness-50 tw:duration-300 tw:!transition-all">
                                        <div>Join Game</div>
                                    </button>
                                </div>
                            {/each}
                        </ul>
                    </div>
                    <div class="tw:flex">
                        <button onclick={(() => window.open("/servers/create", "_self"))} class="btn btn-block tw:w-full tw:!bg-secondary-dark tw:!text-white tw:!border-secondary-dark tw:hover:brightness-50 tw:duration-300 tw:!transition-all">
                            <div>Create Game</div>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>
</main>

<style lang="scss">
    a, span {
        font-family: "Roboto";
        font-weight: bold;
        text-transform: uppercase;
    }

    a {
        font-size: 0.85rem;
        line-height: 1.5rem;
    }

    span {
        font-size: 0.85rem;
        line-height: 2.1rem;
        color: hsla(0, 0%, 75%);
    }
    hr {
        color: hsl(0, 0%, 100%);
    }
</style>
