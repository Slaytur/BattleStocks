<script lang="ts">
    import { browser } from "$app/environment";

    import Header from "../lib/components/Header.svelte";
    import Footer from "../lib/components/Footer.svelte";

    import "../lib/css/main.css";

    const { children } = $props();

    if (browser) void import("bootstrap");
</script>

<Header />
{@render children()}
<Footer />
