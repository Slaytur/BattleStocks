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
    <h1 class="tw:!my-10 tw:text-center">Sign Up</h1>
    <div class="tw:container tw:mx-auto tw:w-1/4">
        <div class="card">
            <div class="card-body">
                <form method="POST" action="?/signup" use:enhance>
                    <div class="tw:mb-4">
                        <label for="email" class="form-label tw:text-black">Email Address</label>
                        <input type="email" bind:value={email} name="email" id="email" class="form-control tw:!border-black/40 tw:!text-black  tw:!placeholder-black" autocomplete="email" required />
                    </div>
                    <div class="tw:mb-4">
                        <label for="password" class="form-label tw:text-black">Password</label>
                        <input type="password" bind:value={password} class="form-control tw:!text-black tw:!border-black/40  tw:!placeholder-black" name="password" id="password" autocomplete="new-password" required />
                    </div>
                    <div class="tw:mb-4">
                        <label for="password" class="form-label tw:text-black">Confirm Password</label>
                        <input type="password" bind:value={confirmPassword} class="form-control tw:!text-black tw:!border-black/40 tw:!placeholder-black" name="password" id="password" autocomplete="new-password" required />
                    </div>
                    <button type="submit" class="btn btn-block tw:w-full btn-{(password !== confirmPassword && password !== "") || (password.length < 4 && password !== "") ? "danger" : "success"}" disabled={email === "" || password === "" || confirmPassword === "" || password.length < 4 || password !== confirmPassword}>
                        {#if password !== confirmPassword && password !== ""}
                            Passwords do not match.
                        {:else if password.length < 4 && password !== ""}
                            Password too short.
                        {:else}
                            Sign Up
                        {/if}
                        <FontAwesomeIcon icon={faArrowRightToBracket} />
                    </button>
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
