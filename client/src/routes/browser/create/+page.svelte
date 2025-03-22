<script lang="ts">
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faDiscord, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

    import gsap from "gsap";
    import { onMount } from "svelte";
    import { number } from "zod";

    let main: HTMLElement;

    let name: String = $state("");
    let pin: String = $state("");
    let phases: number = $state(4);
    let safePhases: number = $derived(Math.min(Math.max(phases, 2), 10))

    let servers = ["server1", "server2", "server3"];

    onMount(() => {
        const ctx = gsap.context(() => {
            gsap.set(main, { y: -150, opacity: 0 })
            gsap.to(main, { y: 0, opacity: 1 });
        }, main);

        return () => ctx.revert();
    });
</script>

<main bind:this={main}>
    <h1 class="tw:!text-text-dark tw:!my-10 tw:text-center">Server Browser</h1>
    <div class="tw:container tw:mx-auto tw:w-1/4">
        <div class="card tw:!bg-background-secondary">
            <div class="card-body">
                <div class="tw:mb-4 tw:text-center">
                    <label for="email" class="form-label tw:text-text-dark">Server Name</label>
                    <input bind:value={name} name="name" id="name" class="tw:text-center form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70" placeholder="Server1" />
                </div>

                <div class="tw:mb-4 tw:text-center">
                    <label for="email" class="form-label tw:text-text-dark">Server Pin</label>
                    <input bind:value={pin} name="pin" id="pin" class="tw:text-center form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70" placeholder="1234" />
                </div>

                <div class="tw:mb-4 tw:text-center tw:!text-text-dark">
                    <label for="email" class="form-label tw:text-text-dark">Number of Phases</label>
                    <input type="range" min=2 max=10 bind:value={phases} name="phases" id="phases" class="tw:text-center form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70 tw:accent-emerald-600" placeholder="Server Name" />
                    <input type="number" min=2 max=10 bind:value={phases} name="phases" id="phases" class="tw:!w-[80px] tw:!mx-auto tw:!my-2 tw:text-center form-control tw:!text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70 tw:accent-emerald-600" placeholder="Server Name" />
                </div>
                
                <form action="">
                    <div class="tw:flex">
                        <button type="submit" class="btn btn-block tw:w-full tw:!bg-secondary-dark tw:!text-white tw:!border-secondary-dark tw:hover:brightness-50 tw:duration-300 tw:!transition-all">
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
