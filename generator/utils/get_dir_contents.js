import fs from 'fs'
import path from 'path'
import chalk from 'chalk'

export async function get_dir_contents(source, ext_type) {
  if (!source) {
    throw new Error(chalk.red('get_dir_contents requires a source argument'))
  }

  if (ext_type) {
    const dirContentsByExt = await fs.readdirSync(source).filter(file => {
      return file[0] !== '.' && path.extname(file).match(ext_type)
    })
    return dirContentsByExt
  }

  const dirContents = await fs.readdirSync(source)
  return dirContents
}
