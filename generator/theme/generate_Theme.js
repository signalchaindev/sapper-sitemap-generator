import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import {
  generate_css_vars,
  generate_theme_switch,
  get_dir_contents,
  pretty_print_object,
  // reset_directory,
} from '../utils'

export default async function generate_Theme(
  writeMergedThemeModulesFile = false,
) {
  const source = path.join(process.cwd(), 'src', 'styles', 'theme')
  const dest = path.join(process.cwd(), 'src', 'styles', 'generated')

  const ext_type = /.js|.ts/
  const themeFiles = await get_dir_contents(source, ext_type)
  let allThemeModules = {} // eslint-disable-line

  // TODO: Find a way to clear out dead files without deleting everything
  // that way the generate function can run while the site is running
  // reset_directory(dest)
  // If "dest" doesn't exist, create it
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }

  // Make the magic!
  themeFiles.map(file => {
    const fileName = file.replace(/.js|.ts/, '')
    const module = require(`${source}/${file}`)
    let moduleContents

    // If the file is empty, short circuit to prevent error
    if (Object.keys(module).length === 0) return

    for (const [key, value] of Object.entries(module)) {
      moduleContents = module[key]

      // Merge theme modules into a big theme module
      if (writeMergedThemeModulesFile) {
        allThemeModules[key] = value
      }
    }

    const isTheme = fileName.match(/theme|themes/)

    // Write CSS files
    // if it's the theme file, write the 'main' obj to CSS and all themes to switch function
    if (isTheme) {
      generate_css_vars(moduleContents.main, dest, fileName)
      generate_theme_switch(moduleContents, dest)
    } else {
      generate_css_vars(moduleContents, dest, fileName)
    }
  })

  if (writeMergedThemeModulesFile) {
    // Merge all modules in /theme and write theme.js
    fs.writeFileSync(
      `${dest}/theme.js`,
      `module.exports = ${pretty_print_object(allThemeModules)}\n`,
      'utf-8',
    )
  }

  console.log(chalk.blue('[generator] Generate Theme process complete'))
}
