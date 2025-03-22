<script>
    import { page } from "$app/stores";

    const id = $page.params.id;
    import "../client.ts";

    let visibleGame = false;
    function toggleVisibleGame() {
      visibleGame = !visibleGame; 
    };

    let visibleOverlay = true;
    function toggleOverlay() {
      visibleOverlay = !visibleOverlay; 
    };
</script>

<button on:click={toggleOverlay}>overlay</button>
<button on:click={toggleGame}>Game</button>

{#if visibleGame}
<article>
    {id}
</article>
{/if}

{#if visibleOverlay}
<overlay>
  OVERLAY
</overlay>
{/if}
