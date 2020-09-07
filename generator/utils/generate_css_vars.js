import fs from 'fs'
import chalk from 'chalk'

export function generate_css_vars(obj, dest, fileName) {
  if (!obj) {
    throw new Error(chalk.red('generate_css_vars requires an object argument'))
  }
  if (!dest) {
    throw new Error(
      chalk.red('generate_css_vars requires a destination argument'),
    )
  }
  if (!fileName) {
    throw new Error(chalk.red('generate_css_vars requires a fileName argument'))
  }

  let contents = ''
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) {
      throw new Error(
        chalk.red(`Cannot read "${key}" value of ${typeof value}`),
      )
    }

    if (value.constructor === Array) {
      contents += value
        .map((val, i) => `\t--${key}${i + 1}: ${val};\n`)
        .join('')
    } else if (value.constructor === Object) {
      for (const [nested_key, nested_value] of Object.entries(value)) {
        contents += `\t--${key}${nested_key}: ${nested_value};\n`
      }
    } else {
      contents += `\t--${key}: ${value};\n`
    }
  }

  const css = `:root {\n${contents}}\n`
  fs.writeFileSync(`${dest}/${fileName}.scss`, css)
}
