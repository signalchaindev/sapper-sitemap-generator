import { promises as fs } from 'fs'
import path from 'path'
import chalk from 'chalk'
import env from '../../.env.js'

export default async function generate_ENV() {
  const envKeys = env[process.env.NODE_ENV]

  let envStr = '# Generated file. Do not edit.\n'
  for (const [key, val] of Object.entries(envKeys)) {
    envStr = envStr + `${key}=${val}\n`
  }

  await fs.writeFile(path.join(process.cwd(), '.env'), envStr, 'utf-8')

  console.log(chalk.blue('[generator] Generate ENV process complete'))
}
