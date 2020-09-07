<script context="module">
  export const FORM = {}
</script>

<script>
  import { createEventDispatcher, onMount, setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { ErrorStore } from '../../stores/store_Errors.js'
  import { isEmpty } from '../../utils/isEmpty.js'
  import modifier from '../modifiers/modifiers.js'

  export let modifiers = null
  export let style = null
  export let initialValues = {}
  export let id = null
  export let action = null
  export let autocomplete = null
  export let enctype = null
  export let method = 'post'
  export let novalidate = null
  export let target = null

  const types = {
    modifiers,
    initialValues,
    id,
    style,
    action,
    autocomplete,
    enctype,
    method,
    novalidate,
    target,
  }

  const mods = modifier($$props, types)

  const dispatch = createEventDispatcher()
  const formData = writable({ ...initialValues })
  const loading = writable(false)

  let form
  let fields = []

  setContext(FORM, {
    formData,
    loading,
    setFieldValue,
  })

  onMount(() => {
    fields = Array.from(form.querySelectorAll('input, select, textarea'))
    fields.forEach(field => handleFieldType(field))

    return () => {
      ErrorStore.clearErrors()
    }
  })

  function setFieldValue(key, value) {
    $formData[key] = value
  }

  function handleFieldType(field) {
    if (field.type === 'checkbox') {
      setFieldValue(field.name, field.checked)
    } else {
      setFieldValue(field.name, field.value)
    }
  }

  function dispatchSubmit() {
    $loading = true
    fields.forEach(field => handleFieldType(field))

    dispatch('submit', {
      formData: $formData,
      resetForm,
      setLoading(value) {
        $loading = value
      },
    })
  }

  function dispatchReset() {
    resetForm()
    dispatch('reset')
  }

  function resetForm(data) {
    try {
      // Handles cases where the reset action is being called by dispatchReset
      if (data && data.constructor !== Event && data.constructor !== Object) {
        throw new Error('data arg must be an object')
      }

      fields.forEach(field => {
        if (field.type === 'checkbox') {
          setFieldValue(
            field.name,
            isEmpty(initialValues) ? false : initialValues[field.name],
          )
        } else {
          setFieldValue(
            field.name,
            isEmpty(initialValues) ? '' : initialValues[field.name],
          )
        }
      })
    } catch (err) {
      if (err) console.error(err)
      $loading = false
    }
  }
</script>

<slot name="styles" />

<form
  bind:this={form}
  on:submit|preventDefault={dispatchSubmit}
  on:reset={dispatchReset}
  {...$mods}
>
  <slot loading={$loading} />
</form>
