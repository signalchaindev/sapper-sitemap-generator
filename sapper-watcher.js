import chokidar from 'chokidar'
import chalk from 'chalk'
import { catch_errors } from './generator/utils'
import generate_Theme from './generator/theme/generate_Theme.js'
import generate_Env from './generator/environment/generate_Env.js'

/**
 * THEME
 */
chokidar.watch('./src/styles/theme/**/*').on('change', event => {
  console.log(chalk.blue(`[watcher] Change in ${event}`))
  catch_errors(generate_Theme)()
})

/**
 * CONTENT
 */
chokidar.watch('./content/**/*').on('change', event => {
  console.log(chalk.blue(`[watcher] Change in ${event}`))
  catch_errors(generate_Theme)()
})

/**
 * ENV
 */
chokidar.watch('./.env.js').on('change', event => {
  console.log(chalk.blue(`[watcher] Change in ${event}`))
  catch_errors(generate_Env)()
})
