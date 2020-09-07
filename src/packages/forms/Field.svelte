<script>
  import { getContext } from 'svelte'
  import { FORM } from './Form.svelte'
  import { formatFieldName } from './formatFieldName.js'
  import { ErrorStore } from '../../stores/store_Errors.js'
  import modifier from '../modifiers/modifiers.js'
  import { isEmpty } from '../../utils/isEmpty.js'

  export let modifiers = null
  export let error = ''
  export let hideError = false
  // Input
  export let name
  export let id = formatFieldName(name)
  export let type = 'text'
  export let autocomplete = 'on'
  export let maxlength = null
  export let minlength = null
  export let placeholder = ''
  export let readonly = null
  export let required = false
  export let spellcheck = true

  const hasErrorProp = Object.keys($$props).includes('error')
  const fieldKey = id
  const { formData } = getContext(FORM)
  $: value = $formData[fieldKey] || ''

  if (type !== 'text' && type !== 'email' && type !== 'password') {
    console.warn('Field type must be one of text, email, or password')
  }

  const types = {
    error,
    hideError,
    name: fieldKey,
    type,
    id,
    autocomplete,
    maxlength,
    minlength,
    placeholder,
    readonly,
    required,
    spellcheck,
    modifiers,
  }
  let mods = modifier($$props, types)
  $: mods = modifier($$props, types, [
    (error && 'input_error') ||
      ($ErrorStore[fieldKey] && 'input_error') ||
      null,
  ])

  const fieldAttrs = Object.fromEntries(
    Object.entries($mods).filter(attr => {
      return (
        attr[0] !== 'error' &&
        attr[0] !== 'hideError' &&
        attr[0] !== 'class' &&
        attr[0] !== 'style'
      )
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
  <span>{name}</span>

  <input id={$mods.for || null} on:change={onChange} {value} {...fieldAttrs} />

  {#if hasErrorProp && !isEmpty(error)}
    <small class={hideError ? 'hide' : null} role="alert">{error}</small>
  {:else if $ErrorStore[fieldKey]}
    <small class={hideError ? 'hide' : null} role="alert">
      {$ErrorStore[fieldKey]}
    </small>
  {/if}
</label>
<slot />
