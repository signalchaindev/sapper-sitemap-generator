<script>
  import modifier from '../modifiers/modifiers.js'

  export let modifiers = null
  export let id = null
  export let disabled = false
  export let form = null
  export let name = null

  // fieldset elements are neat. RTM.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/fieldset
  const types = {
    id,
    disabled,
    form,
    name,
    modifiers,
  }
  const mods = modifier($$props, types)
</script>

<fieldset {...$mods} {disabled} aria-busy={disabled}>
  <slot />
</fieldset>
