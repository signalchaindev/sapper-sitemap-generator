<script>
  export let style = null
</script>

<svg
  {style}
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 512 512"
  fill="none"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M112 268l144 144 144-144M256 392V100"
  />
</svg>

<style lang="scss">
  svg {
    --color: currentColor;
    --dimensions: var(--size3);
    --stroke: 1;
    height: var(--dimensions);
    width: var(--dimensions);
    stroke: var(--color);
    stroke-width: calc(70 * var(--stroke));
  }
</style>
