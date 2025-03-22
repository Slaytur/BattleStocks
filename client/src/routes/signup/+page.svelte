<script lang="ts">
    import { onMount } from "svelte";
    import { enhance } from "$app/forms";

    import gsap from "gsap";
    import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    let main: HTMLElement;

    let email: string = $state("");
    let password: string = $state("");
    let confirmPassword: string = $state("");

    onMount(() => {
        const ctx = gsap.context(() => {
            gsap.set(main, { y: -150, opacity: 0 });
            gsap.to(main, { y: 0, opacity: 1 });
        }, main);

        return () => ctx.revert();
    });
</script>

<main bind:this={main}>
    <h1 class="tw:!text-text-dark tw:!my-10 tw:text-center">Sign Up</h1>
    <div class="tw:container tw:mx-auto tw:w-1/4">
        <div class="card tw:!bg-secondary-dark/30">
            <div class="card-body">
                <form action="?/signup" use:enhance>
                    <div class="tw:mb-4">
                        <label for="email" class="form-label tw:text-text-dark">Email Address</label>
                        <input type="email" bind:value={email} name="email" id="email" class="form-control tw:!bg-primary-dark tw:!border-primary-dark" placeholder="example@example.com" autocomplete="email" required />
                    </div>
                    <div class="tw:mb-4">
                        <label for="password" class="form-label tw:text-text-dark">Password</label>
                        <input type="password" bind:value={password} class="form-control tw:!bg-primary-dark tw:!border-primary-dark" name="password" id="password" placeholder="Enter password" autocomplete="new-password" required />
                    </div>
                    <div class="tw:mb-4" hidden={!password.length}>
                        <label for="password" class="form-label tw:text-text-dark">Confirm Password</label>
                        <input type="password" bind:value={confirmPassword} class="form-control tw:!bg-primary-dark tw:!border-primary-dark" name="password" id="password" placeholder="Enter password" autocomplete="new-password" required />
                    </div>
                    {#if password !== confirmPassword}
                        <button type="submit" class="btn btn-block tw:w-full tw:!bg-red-600 tw:!text-white tw:!border-secondary-dark tw:hover:brightness-50 tw:duration-300 tw:!transition-all" disabled={email === "" || password === "" || confirmPassword === ""}>
                            Password does not match.
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                        </button>
                    {:else}
                        <button type="submit" class="btn btn-block tw:w-full tw:!bg-secondary-dark tw:!text-white tw:!border-secondary-dark tw:hover:brightness-50 tw:duration-300 tw:!transition-all" disabled={email === "" || password === "" || confirmPassword === ""}>
                            Sign Up
                            <FontAwesomeIcon spin icon={faArrowRightToBracket} />
                        </button>
                    {/if}
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
