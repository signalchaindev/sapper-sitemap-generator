export function formatFieldName(str) {
  const cleanStr = str.replace(/\s|-|_/g, ' ')
  const stripDoubleSpace = cleanStr.replace(/\s+/gi, ' ')
  const camelCase = stripDoubleSpace
    .split(' ')
    .map((char, i) => {
      if (i === 0) return char.toLowerCase()
      const splitChar = char.split('')
      splitChar.splice(0, 1, splitChar[0].toUpperCase())
      return splitChar.join('')
    })
    .join('')
  return camelCase
}
