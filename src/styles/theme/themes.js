const { colors } = require('./colors')

module.exports = {
  themes: {
    main: {
      'root-size': '16px',
      'nav-height': '90px',
      'hh-nav-height': '52px',

      display: 'Montserrat, sans-serif',
      body:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      mono: 'menlo, inconsolata, monospace',

      'ds-text': colors.blue[600],
      'ds-text_i': colors.white,
      text: colors.gray[800],
      'lt-text': colors.gray[700],
      'dk-text': colors.gray[900],
      text_i: colors.white,
      'ac-text': colors.cyan[500],

      hover: colors.blue[500],
      hover_i: colors.white,

      active: colors.blue[400],
      active_i: colors.white,

      bg: colors.white,
      bg_i: colors['blue-gray'][800],

      'focus-ring': `0 0 0 2px ${colors.cyan[200]}`,
      'focus-ring_i': `0 0 0 2px ${colors.green[400]}`,
    },
  },
}
