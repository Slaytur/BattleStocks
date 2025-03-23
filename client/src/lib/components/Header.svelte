<script lang="ts">
    import { page } from "$app/state";
    import { faArrowRightFromBracket, faGaugeSimpleHigh } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";

    // import Logo from "$lib/images/icon.svg";

    let scrollY: number = $state(0);
    let nav: HTMLElement | undefined = $state();
</script>

<svelte:window bind:scrollY={scrollY} />
<header>
    <nav bind:this={nav} class="navbar navbar-dark navbar-expand-lg tw:bg-[#2f6141]" class:scrolled={scrollY !== nav?.offsetTop}>
        <div class="container-fluid">
            <a class="navbar-brand tw:font-chewy" href="/">
                <!-- <img src={Logo} alt="Voyago logo" width="30" height="24" class="d-inline-block align-text-top hover:tw:rotate-90 tw:transition-all"> -->
                BattleStocks
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar-nav">
                <div class="navbar-nav me-auto tw:font-medium">
                    <a class="nav-link" class:active={page.url.pathname === "/dashboard"} href="/dashboard">Dashboard</a>
                    <a class="nav-link" class:active={page.url.pathname === "/servers"} href="/servers">Server Browser</a>
                    <a class="nav-link" class:active={page.url.pathname === "/about"} href="/about">About</a>
                </div>
                <div class="navbar-nav ms-auto tw:font-medium">
                    {#if false}
                        <div class="dropdown tw:me-2">
                            <button class="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Account</button>
                            <ul class="dropdown-menu dropdown-menu-end">
                                <li><a href="/dashboard" class="dropdown-item">
                                    <FontAwesomeIcon icon={faGaugeSimpleHigh} />
                                    Dashboard
                                </a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a href="/dashboard" class="dropdown-item">
                                    <FontAwesomeIcon icon={faArrowRightFromBracket} />
                                    Sign Out
                                </a></li>
                            </ul>
                        </div>
                    {:else}
                        <a href="/signup" class="btn btn-success tw:me-2">Sign Up</a>
                        <a href="/login" class="btn btn-success">Sign In</a>
                    {/if}
                </div>
            </div>
        </div>
    </nav>
</header>

<style>
    nav {
        font-family: "Inter", sans-serif;
        border-bottom: 1px solid hsla(0, 100%, 100%, 10%);
    }
</style>
