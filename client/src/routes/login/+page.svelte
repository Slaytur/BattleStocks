<script lang="ts">
    import { onMount } from "svelte";
    import gsap from "gsap";

    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faDiscord, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
    import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

    let main: HTMLElement;

    let email = $state("");
    let password = $state("");

    let loggingIn = $state(false);
    let loginBtn = $state(-1); // -1 = default, 0 | 1 | 2

    let errMsg = $state("");

    onMount(() => {
        const ctx = gsap.context(() => {
            gsap.set(main, { y: -150, opacity: 0 });
            gsap.to(main, { y: 0, opacity: 1 });
        }, main);

        return () => ctx.revert();
    });
</script>

<main bind:this={main}>
    <h1 class="tw:!text-text-dark tw:!my-10 tw:text-center">Log In</h1>
    <div class="tw:container tw:mx-auto tw:w-1/4">
        <div class="err-msg" hidden={errMsg === ""}>{errMsg}</div>
        <div class="card tw:!border-secondary-dark tw:!bg-background-dark">
            <div class="card-body">
                <div class="tw:flex tw:flex-col">
                    <a class="btn btn-block tw:!border-secondary-dark tw:!my-1 tw:!text-white tw:hover:brightness-50 tw:duration-300 tw:!transition-all" href="/login/discord" class:disabled={loginBtn === 0} onclick={(() => { loginBtn = 0; })}>
                        {#if loginBtn !== 0}
                            <FontAwesomeIcon icon={faDiscord} />
                            Sign in with Discord
                        {:else}
                            <div class="ui-spinner"></div>
                        {/if}
                    </a>
                    <a class="btn btn-block tw:!border-secondary-dark tw:!my-1 tw:!text-white tw:hover:brightness-50 tw:duration-300 tw:!transition-all" href="/login/github" class:disabled={loginBtn === 1} onclick={(() => { loginBtn = 1; })}>
                        {#if loginBtn !== 1}
                            <FontAwesomeIcon icon={faGithub} />
                            Sign in with GitHub
                        {:else}
                            <div class="ui-spinner"></div>
                        {/if}
                    </a>
                    <a class="btn btn-block tw:!border-secondary-dark tw:!my-1 tw:!text-white tw:hover:brightness-50 tw:duration-300 tw:!transition-all" href="/login/google" class:disabled={loginBtn === 2} onclick={(() => { loginBtn = 2; })}>
                        {#if loginBtn !== 2}
                            <FontAwesomeIcon icon={faGoogle} />
                            Sign in with Google
                        {:else}
                            <div class="ui-spinner"></div>
                        {/if}
                    </a>
                </div>
                <div class="tw:w-full tw:flex tw:justify-center tw:align-middle tw:mt-2">
                    <hr class="tw:flex-1" style="margin-right: 0.5rem;">
                    <span>or</span>
                    <hr class="tw:flex-1" style="margin-left: 0.5rem;">
                </div>
                <form action="/login/email/callback" onsubmit={(() => { loginBtn = 3; })}>
                    <div class="tw:mb-4">
                        <label for="email" class="form-label tw:text-text-dark">Email Address</label>
                        <input bind:value={email} type="email" name="email" id="email" class="form-control tw:text-text-dark tw:!placeholder-text-dark tw:!bg-background-dark tw:!border-primary-dark/70" placeholder="example@example.com" autocomplete="email" required />
                    </div>
                    <div class="tw:mb-4">
                        <label for="password" class="form-label tw:text-text-dark">Password</label>
                        <input bind:value={password} type="password" class="form-control tw:!bg-background-dark tw:!placeholder-text-dark tw:!border-primary-dark/70" name="password" id="password" placeholder="Enter password" autocomplete="new-password" required />
                    </div>
                    <button type="submit" class="btn btn-block tw:w-full tw:!bg-secondary-dark tw:!text-white tw:!border-secondary-dark tw:hover:brightness-50 tw:duration-300 tw:!transition-all" disabled={email === "" || password === "" || loginBtn === 2}>
                        {#if loginBtn !== 2}
                            Log In
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                        {:else}
                            <div class="ui-spinner"></div>
                        {/if}
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

    .err-msg {
        background: #d43333;
        border: 2px solid #ff0000;
        border-radius: 1rem;
        padding: 1rem;
        text-align: center;
    }
</style>
