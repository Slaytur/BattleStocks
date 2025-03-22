<script lang="ts">
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faDiscord, faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

    import gsap from "gsap";
    import { onMount } from "svelte";

    let main: HTMLElement;

    onMount(() => {
        const ctx = gsap.context(() => {
            gsap.set(main, { y: -150, opacity: 0 })
            gsap.to(main, { y: 0, opacity: 1 });
        }, main);

        return () => ctx.revert();
    });
</script>

<main bind:this={main}>
    <h1 class="tw:!text-text-dark tw:!my-10 tw:text-center">Log In</h1>
    <div class="tw:container tw:mx-auto tw:w-1/4">
        <div class="card tw:!bg-secondary-dark/30">
            <div class="card-body">
                <div class="tw:flex tw:flex-col">
                    <a class="btn btn-block tw:!bg-secondary-dark tw:!my-1 tw:!text-white tw:hover:brightness-50 tw:duration-300 tw:!transition-all" href="/login/google">
                        <FontAwesomeIcon icon={faGoogle} />
                        Sign in with Google
                    </a>
                    <a class="btn btn-block tw:!bg-secondary-dark tw:!my-1 tw:!text-white tw:hover:brightness-50 tw:duration-300 tw:!transition-all" href="/login/discord">
                        <FontAwesomeIcon icon={faDiscord} />
                        Sign in with Discord
                    </a>
                    <a class="btn btn-block tw:!bg-secondary-dark tw:!my-1 tw:!text-white tw:hover:brightness-50 tw:duration-300 tw:!transition-all" href="/login/github">
                        <FontAwesomeIcon icon={faGithub} />
                        Sign in with GitHub
                    </a>
                </div>
                <div class="tw:w-full tw:flex tw:justify-center tw:align-middle tw:mt-2">
                    <hr class="tw:flex-1" style="margin-right: 0.5rem;">
                    <span>or</span>
                    <hr class="tw:flex-1" style="margin-left: 0.5rem;">
                </div>
                <form action="">
                    <div class="tw:mb-4">
                        <label for="email" class="form-label tw:text-text-dark">Email address</label>
                        <input type="email" name="email" id="email" class="form-control tw:!bg-primary-dark tw:!border-primary-dark" placeholder="example@example.com" autocomplete="email" required />
                    </div>
                    <div class="tw:mb-4">
                        <label for="password" class="form-label tw:text-text-dark">Password</label>
                        <input type="password" class="form-control tw:!bg-primary-dark tw:!border-primary-dark" name="password" id="password" placeholder="Enter password" autocomplete="new-password" required />
                    </div>
                    <button type="submit" class="btn btn-block tw:w-full tw:!bg-secondary-dark tw:!text-white tw:!border-secondary-dark tw:hover:brightness-50 tw:duration-300 tw:!transition-all" disabled>
                        <div class="ui-spinner"></div>
                        <!-- Log In -->
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
