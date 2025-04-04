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
    <h1 class="tw:!my-10 tw:text-center">Log In</h1>
    <div class="tw:container tw:mx-auto tw:w-1/4">
        <div class="err-msg" hidden={errMsg === ""}>{errMsg}</div>
        <div class="card">
            <div class="card-body">
                <div class="tw:flex tw:flex-col">
                    <a class="btn btn-block tw:!border-black tw:!my-1 tw:!text-black tw:hover:brightness-50 tw:duration-300 tw:!transition-all tw:!flex tw:align-middle tw:justify-center tw:items-center" href="/login/discord" class:disabled={loginBtn === 0} onclick={(() => { loginBtn = 0; })}>
                        {#if loginBtn !== 0}
                            <FontAwesomeIcon icon={faDiscord} class="tw:me-2 tw:bg-black tw:text-white tw:p-1 tw:rounded-2xl tw:!justify-self-start" />
                            Sign in with Discord
                        {:else}
                            <div class="ui-spinner"></div>
                        {/if}
                    </a>
                    <a class="btn btn-block tw:!border-black tw:!my-1 tw:!text-black tw:hover:brightness-50 tw:duration-300 tw:!transition-all tw:!flex tw:align-middle tw:justify-center tw:items-center" href="/login/github" class:disabled={loginBtn === 1} onclick={(() => { loginBtn = 1; })}>
                        {#if loginBtn !== 1}
                            <FontAwesomeIcon icon={faGithub} class="tw:me-2 tw:bg-[#000000] tw:text-white tw:p-1 tw:rounded-2xl" />
                            Sign in with GitHub
                        {:else}
                            <div class="ui-spinner"></div>
                        {/if}
                    </a>
                    <a class="btn btn-block tw:!border-black tw:!my-1 tw:!text-black tw:hover:brightness-50 tw:duration-300 tw:!transition-all tw:!flex tw:align-middle tw:justify-center tw:items-center" href="/login/google" class:disabled={loginBtn === 2} onclick={(() => { loginBtn = 2; })}>
                        {#if loginBtn !== 2}
                            <FontAwesomeIcon icon={faGoogle} class="tw:me-2 tw:bg-[#000000] tw:text-white tw:p-1 tw:rounded-2xl" />
                            Sign in with Google
                        {:else}
                            <div class="ui-spinner"></div>
                        {/if}
                    </a>
                </div>
                <div class="tw:w-full tw:flex tw:justify-center tw:align-middle tw:my-2">
                    <hr class="tw:flex-1 tw:!text-black" style="margin-right: 0.5rem;">
                    <span class="tw:!text-black/60">or</span>
                    <hr class="tw:flex-1 tw:!text-black" style="margin-left: 0.5rem;">
                </div>
                <form method="POST" action="?/login" onsubmit={(() => { loginBtn = 3; })}>
                    <div class="tw:mb-4">
                        <label for="email" class="form-label tw:text-text tw:!hidden">Email</label>
                        <input bind:value={email} type="email" name="email" id="email" class="form-control tw:!text-black tw:!border-[#00000080] tw:!placeholder-black" placeholder="Email Address" autocomplete="email" required />
                    </div>
                    <div class="tw:mb-4">
                        <label for="password" class="form-label tw:text-text tw:!hidden">Password</label>
                        <input bind:value={password} type="password" class="form-control tw:!text-black tw:!border-[#00000080] tw:!placeholder-black" name="password" id="password" placeholder="Password" autocomplete="new-password" required />
                    </div>
                    <button type="submit" class="btn btn-block tw:w-full btn-success tw:!text-white  tw:hover:brightness-50 tw:duration-300 tw:!transition-all tw:disabled:!bg-primary" disabled={email === "" || password === "" || loginBtn === 2}>
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
    a {
        font-size: 0.8rem;
    }

    a, span {
        font-family: "Roboto";
        font-weight: bold;
        text-transform: uppercase;
    }

    a, button, .ui-spinner {
        line-height: 1.75rem;
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
