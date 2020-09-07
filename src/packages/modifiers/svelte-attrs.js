import merge from 'lodash.merge'
import { isEmpty } from '../../utils/isEmpty.js'

export default function getAttrs(props, types) {
  const modifiers = {}

  const filteredProps = Object.entries(props).filter(entry => {
    if (
      entry[0] === 'modifiers' ||
      entry[0] === '$$slots' ||
      entry[0] === '$$scope'
    ) {
      return false
    }

    return true
  })

  // If filteredProps and types are empty at this point, the work is finished
  if (isEmpty(filteredProps) && isEmpty(types)) {
    return {}
  }

  const filteredPropsObj = Object.fromEntries(filteredProps)
  const mergedProps = merge(filteredPropsObj, types)

  const mergedPropsEntries = Object.entries(mergedProps)
  const allowedKeys = Object.keys(types)

  const filteredAttrs = mergedPropsEntries.filter(entry => {
    const dataAttr = entry[0].match(/data-[a-z]{0,}/g)
    const ariaAttr = entry[0].match(/aria-[a-z]{0,}/g)
    const allowed = allowedKeys.includes(entry[0])

    // This if block formats the modifiers obj and discards it from the filter
    // The modifiers input is a different shape from the rest of the attrs and need to be handled as a special case
    if (entry[0] === 'modifiers') {
      const classes = entry[1] && entry[1].classes
      if (classes) modifiers.class = classes && classes
      return false
    }

    if (dataAttr || ariaAttr || allowed) {
      return !isEmpty(entry[1])
    }

    return false
  })

  const attrs = Object.fromEntries(filteredAttrs)
  return { ...attrs, ...modifiers }
}
