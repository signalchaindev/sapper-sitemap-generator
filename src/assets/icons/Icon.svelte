<script>
  import ArrowRight from './svg/arrow-right.svelte'

  export let name
  export let id = null
  export let style = null
  export let modifiers = null

  const component =
    {
      'arrow-right': ArrowRight,
    }[name] || ''
</script>

<svelte:component this={component} {id} {modifiers} {style} />
