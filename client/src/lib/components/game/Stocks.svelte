<script lang="ts">
  // let shares = shares.ticker; 
  let shares = 5;
</script>
<p>{ticker}</p>
<a class="btn btn-block tw:!border-black tw:!my-1 tw:!text-black tw:hover:brightness-50 tw:duration-300 tw:!transition-all tw:!flex tw:align-middle tw:justify-center tw:items-center" onclick={(() => { shares += 1; })}></a>
<a class="btn btn-block tw:!border-black tw:!my-1 tw:!text-black tw:hover:brightness-50 tw:duration-300 tw:!transition-all tw:!flex tw:align-middle tw:justify-center tw:items-center" onclick={(() => { shares -= 1; })}></a>
