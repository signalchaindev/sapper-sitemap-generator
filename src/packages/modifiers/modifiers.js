import { writable } from 'svelte/store'
import getAttrs from './svelte-attrs'
import { isEmpty } from '../../utils/isEmpty'

function modifiersStore(props, types, mutations = []) {
  if (types && types.constructor === Array) {
    mutations = types
    types = {}
  }

  let mods = {}
  const modProps = props.modifiers
  const hasModifiers = !isEmpty(modProps)
  let modifiersArr = hasModifiers ? modProps : []

  if (!Array.isArray(modifiersArr) && hasModifiers) {
    modifiersArr = modProps.split(' ')
  }

  const hasMutations = !isEmpty(mutations)
  const mutationsArr = hasMutations
    ? mutations.filter(item => !isEmpty(item))
    : []

  const allModifiers = [...new Set([...modifiersArr, ...mutationsArr])]

  const attrs = getAttrs(props, types)
  const propsStylesAttr = props && props.style ? props.style.split(' ') : []
  const stylesArr = propsStylesAttr.length !== 0 ? [...propsStylesAttr] : []

  // This length check means something could be optimized up top
  if (Array.isArray(allModifiers)) {
    let cleanClasses

    for (const item of allModifiers) {
      if (item.constructor === Object) {
        for (const [key, val] of Object.entries(item)) {
          // change push to unshift if you want to style attribute to win out over the modifier
          stylesArr.push(`--${key}: ${val};`)
        }
      }

      cleanClasses = allModifiers.filter(item => {
        return item.constructor !== Object
      })
    }

    const formattedClasses = [...new Set(cleanClasses)].join(' ')
    const hasClasses = !isEmpty(formattedClasses)
    mods.class = hasClasses ? formattedClasses : null

    const formattedStyles = stylesArr.join(' ')
    const hasStyles = !isEmpty(formattedStyles)
    mods.style = hasStyles ? formattedStyles : null

    // eslint-disable-next-line
    const { style, ...rest } = attrs
    mods = { ...mods, ...rest }

    return writable(mods)
  }

  const formattedClasses = hasModifiers ? allModifiers + ' ' + props : props
  const hasClasses = !isEmpty(formattedClasses)

  mods.class = hasClasses ? formattedClasses : null
  const formattedStyles = stylesArr.join(' ')
  const hasStyles = !isEmpty(formattedStyles)
  mods.style = hasStyles ? formattedStyles : null

  // eslint-disable-next-line no-unused-vars
  const { style, ...rest } = attrs
  mods = { ...mods, ...rest }

  return writable(mods)
}

// WeakMap will only accept objects as keys
const storeMap = new WeakMap()

function modifiersStoreFactory(props, types, mutations) {
  const key = { key: props }

  if (!storeMap.has(key)) {
    storeMap.set(key, modifiersStore(props, types, mutations))
  }

  return storeMap.get(key)
}

const modifier = modifiersStoreFactory
export default modifier
