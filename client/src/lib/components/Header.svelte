<script lang="ts">
// import Logo from "$lib/images/icon.svg";
</script>

<header>
    <nav class="navbar navbar-dark navbar-expand-lg tw:bg-transparent">
        <div class="container-fluid">
            <a class="navbar-brand tw:font-chewy" href="/">
                <!-- <img src={Logo} alt="Voyago logo" width="30" height="24" class="d-inline-block align-text-top hover:tw:rotate-90 tw:transition-all"> -->
                snoopies-wics
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbar-nav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbar-nav">
                <ul class="navbar-nav me-auto tw:font-medium">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/dashboard">Dashboard</a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto tw:font-medium tw:mr-4">
                    <li class="nav-item tw:me-2">
                        <a href="/signup" class="btn tw:!bg-primary tw:!text-text-dark tw:hover:brightness-50 tw:tracking-wide tw:duration-300 tw:!transition-all">Sign Up</a>
                    </li>
                    <li class="nav-item tw:me-2">
                        <a href="/login" class="btn tw:!bg-primary tw:!text-text-dark tw:hover:brightness-50 tw:tracking-wide tw:duration-300 tw:!transition-all">Sign In</a>
                    </li>
                    <li class="nav-item">
                        <a href="/account" class="btn tw:!bg-primary tw:!text-text-dark tw:hover:brightness-50 tw:tracking-wide tw:duration-300 tw:!transition-all">Account</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>

<style>
    nav {
        border-bottom: 1px solid hsla(0, 100%, 100%, 10%);
    }
</style>
