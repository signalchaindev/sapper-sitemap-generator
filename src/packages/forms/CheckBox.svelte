<script>
  import { getContext } from 'svelte'
  import { FORM } from './Form.svelte'
  import { formatFieldName } from './formatFieldName.js'
  import modifier from '../modifiers/modifiers.js'

  // TODO: Add is required error feature
  export let modifiers = null
  export let name
  export let id = formatFieldName(name)
  export let label
  // There is a difference between value and checked
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#value
  export let value = null
  export let readonly = false

  const fieldKey = id
  const { formData } = getContext(FORM)
  $: checked = $formData[fieldKey] || false

  const types = {
    id,
    name: fieldKey,
    label,
    value,
    readonly,
    modifiers,
  }
  const mods = modifier($$props, types, ['checkbox-label'])

  const fieldAttrs = Object.fromEntries(
    Object.entries($mods).filter(attr => {
      return attr[0] !== 'class' && attr[0] !== 'style'
    }),
  )

  function onChange() {
    // Only for use with inputs that aren't inside a form
    // Or maybe unnecessary altogether
    // Maybe for validation?
  }
</script>

<label
  for={$mods.id || null}
  class={$mods.class || null}
  style={$mods.style || null}
>
  <input
    id={$mods.for || null}
    type="checkbox"
    class="hide"
    on:change={onChange}
    {...fieldAttrs}
    {readonly}
    {checked}
  />
  <button
    type="button"
    on:click={() => (checked = !checked)}
    aria-hidden
    tabindex="-1"
  >
    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <rect class="cb-bg" width="50" height="50" rx="11" />
      <path
        class="square"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11 0C4.925 0 0 4.925 0 11v28c0 6.075 4.925 11 11 11h28c6.075 0
        11-4.925 11-11V11c0-6.075-4.925-11-11-11H11zm0 6a5 5 0 00-5 5v28a5 5 0
        005 5h28a5 5 0 005-5V11a5 5 0 00-5-5H11z"
      />
      <path
        class="check"
        d="M16.535 21.878a4 4 0 00-5.57 5.744l5.57-5.744zM22 32.75l-2.785
        2.872a4 4 0 005.613-.044L22 32.75zm17.828-12.172a4 4 0
        10-5.656-5.656l5.656 5.656zm-28.863 7.044l8.25 8 5.57-5.744-8.25-8-5.57
        5.744zm13.863 7.956l15-15-5.656-5.656-15 15 5.656 5.656z"
      />
    </svg>
  </button>
  <span>{label}</span>
</label>
