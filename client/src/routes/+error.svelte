<script lang="ts">
    import { concurrent } from "svelte-typewriter";
    import { page } from "$app/state";
</script>

<section class="tw:flex tw:max-h-screen tw:h-screen tw:flex-col tw:justify-center tw:items-center tw:font-sourcesans">
    <p class="tw:text-[60px]">Sorry!</p>
    <p use:concurrent={{ interval: 120 }} class="tw:font-bold tw:text-[50px]">
        Error {page.status}: {page.error?.message}
    </p>
</section>
