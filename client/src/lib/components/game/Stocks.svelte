<script lang="ts">
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";

    import { core } from "./core.svelte"

    import type { StockSnap } from "../../../../../shared/typings/types";

    import tickers from "../../../../../shared/data/ticker.json";

    let { stock, shares }: { stock: StockSnap, shares: number } = $props();

    


</script>

<p>{(tickers as unknown as any[])[stock.name as any]}</p>
<div class="card">
    <button class="btn btn-block tw:!border-black tw:!my-1 tw:!text-black tw:hover:brightness-50 tw:duration-300 tw:!transition-all tw:!flex tw:align-middle tw:justify-center tw:items-center" onclick={(() => { shares += 1; })}>
        <FontAwesomeIcon icon={faPlus} />
    </button>
    <p>{stock.value}</p>
    <button class="btn btn-block tw:!border-black tw:!my-1 tw:!text-black tw:hover:brightness-50 tw:duration-300 tw:!transition-all tw:!flex tw:align-middle tw:justify-center tw:items-center" onclick={(() => { shares -= 1; })}>
        <FontAwesomeIcon icon={faMinus} />
    </button>
    <button onclick={(() => {core.app.updateStock(stock.name, shares)})}>Update</button>
</div>
