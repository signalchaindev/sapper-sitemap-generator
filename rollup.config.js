import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json'
import config from 'sapper/config/rollup.js'
import sveltePreprocess from 'svelte-preprocess'
import postcssPresetEnv from 'postcss-preset-env'
import pkg from './package.json'
import sapperenv from './.env.js'

const mode = process.env.NODE_ENV
const dev = mode === 'development'
const legacy = !!process.env.SAPPER_LEGACY_BUILD

// Create an object of the values from .env.js based on current environment
const ENV_VARS = {}
const modes = Object.keys(sapperenv)
const idx = modes.indexOf(mode)
const [_, envVars] = Object.entries(sapperenv)[idx]

for (const [key, val] of Object.entries(envVars)) {
  ENV_VARS['process.env.NODE_ENV'] = JSON.stringify(mode)
  ENV_VARS[`process.env.${key}`] = JSON.stringify(val)
}

/**
 * autoprefixer browserslist is in the package.json
 *
 * postcss-preset-env enables Stage 2 by default
 * https://preset-env.cssdb.org/features
 * https://www.npmjs.com/package/postcss-preset-env
 *
 * We need Stage 0 for :focus-visible and :focus-within
 *
 * We are using the older syntax for :is()
 * Until :is() has better support, use :matches()
 *
 */

const preprocess = sveltePreprocess({
  scss: {
    includePaths: ['src'],
    sourceMap: dev,
  },
  postcss: {
    plugins: [
      postcssPresetEnv({
        autoprefixer: !dev,
        features: {
          'focus-visible': true,
          'focus-within': true,
          matches: true,
        },
      }),
    ],
  },
})

const onwarn = (warning, onwarn) => {
  if (warning.loc.file.match(/depd/gi)) {
    return
  }

  return (
    (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
    (warning.code === 'CIRCULAR_DEPENDENCY' && /[/\\]@sapper[/\\]/.test(warning.message)) ||
    onwarn(warning)
  )
}

const client = {
  input: config.client.input(),
  output: config.client.output(),
  plugins: [
    replace({
      'process.browser': true,
      ...ENV_VARS,
    }),
    svelte({
      dev,
      preprocess,
      hydratable: true,
      emitCss: true,
    }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    json(),
    commonjs(),

    legacy && babel({
      extensions: ['.js', '.mjs', '.html', '.svelte'],
      babelHelpers: 'runtime',
      exclude: ['node_modules/@babel/**'],
      presets: [
        ['@babel/preset-env', {
          targets: '> 0.25%, not dead'
        }]
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import',
        ['@babel/plugin-transform-runtime', {
          useESModules: true
        }]
      ]
    }),

    !dev &&
    terser({
      module: true,
    }),
  ],

  preserveEntrySignatures: false,
  onwarn,
}

const server = {
  input: config.server.input(),
  output: config.server.output(),
  plugins: [
    replace({
      'process.browser': false,
      ...ENV_VARS,
    }),
    svelte({
      dev,
      preprocess,
      generate: 'ssr',
      hydratable: true,
    }),
    resolve({
      dedupe: ['svelte'],
    }),
    json(),
    commonjs(),
  ],
  external: Object.keys(pkg.dependencies).concat(require('module').builtinModules),

  preserveEntrySignatures: 'strict',
  onwarn,
}

// const serviceworker = {
//   input: config.serviceworker.input(),
//   output: config.serviceworker.output(),
//   plugins: [
//     resolve(),
//     replace({
//       'process.browser': true,
//       ...ENV_VARS,
//     }),
//     json(),
//     commonjs(),
//     !dev && terser({ numWorkers: 1 }),
//   ],
//   preserveEntrySignatures: false,
//   onwarn,
// }

const configuration = {
  client,
  server,
  // serviceworker,
}

export default configuration
