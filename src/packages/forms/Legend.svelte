<script>
  import modifier from '../modifiers/modifiers.js'

  export let modifiers = null
  export let id = null
  export let caption = null
  export let level = '3'
  export let captionClasses = null

  const types = {
    id,
    caption,
    level,
    captionClasses,
    modifiers,
  }
  const mods = modifier($$props, types)
</script>

<legend {...$mods}>
  {#if caption}
    {#if level === '2'}
      <h2 class={captionClasses}>{caption}</h2>
    {:else if level === '3'}
      <h3 class={captionClasses}>{caption}</h3>
    {:else if level === '4'}
      <h4 class={captionClasses}>{caption}</h4>
    {:else}{caption}{/if}
  {:else}
    <slot />
  {/if}
</legend>
