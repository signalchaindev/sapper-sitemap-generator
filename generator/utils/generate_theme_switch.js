import fs from 'fs'
import chalk from 'chalk'
import { pretty_print_object } from './pretty_print_object'

export function generate_theme_switch(themeObj, dest) {
  if (!themeObj) {
    throw new Error(
      chalk.red('generate_theme_switch requires a themeObj argument'),
    )
  }
  if (!dest) {
    throw new Error(
      chalk.red('generate_theme_switch requires a destination argument'),
    )
  }

  const themeSwitch = `export default function switchTheme(themeName) {
  const themes = ${pretty_print_object(themeObj, '  ')}

  const theme = themes[themeName]

  for (const [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty('--' + key, value)
  }
}\n`

  fs.writeFileSync(`${dest}/themeSwitch.js`, themeSwitch)
}
