import chalk from 'chalk'
import { capitalize } from './capitalize'

export function slug_to_pascal_case(str) {
  if (!str) {
    throw new Error(
      chalk.red('slug_to_pascal_case requires a String as an argument'),
    )
  }
  const strToArr = str.split('.')
  if (strToArr.length > 1) strToArr.pop()
  const pascalSlug = strToArr
    .join('')
    .split('-')
    .map(idx => capitalize(idx))
    .join('')
  return pascalSlug
}
