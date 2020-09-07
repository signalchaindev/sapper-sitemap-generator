import fs from 'fs'
import chalk from 'chalk'
import { rimraf } from './rimraf'

export function reset_directory(dest) {
  if (!dest) {
    throw new Error(
      chalk.red('reset_directory requires a directory path argument'),
    )
  }

  // If "dest" exist, delete it
  if (fs.existsSync(dest)) {
    rimraf(dest)
  }

  // If "dest" doesn't exist, create it
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest)
  }
}
