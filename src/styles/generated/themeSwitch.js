export default function switchTheme(themeName) {
  const themes = {
    main: {
      'root-size': '16px',
      'nav-height': '90px',
      'hh-nav-height': '52px',
      display: 'Montserrat, sans-serif',
      body: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      mono: 'menlo, inconsolata, monospace',
      'ds-text': '#3643A1',
      'ds-text_i': '#FBFCFE',
      text: '#282D34',
      'lt-text': '#515B69',
      'dk-text': '#15171A',
      text_i: '#FBFCFE',
      'ac-text': '#086EB1',
      hover: '#4D5DD1',
      hover_i: '#FBFCFE',
      active: '#6181ED',
      active_i: '#FBFCFE',
      bg: '#FBFCFE',
      bg_i: '#25293C',
      'focus-ring': '0 0 0 2px #73CCEB',
      'focus-ring_i': '0 0 0 2px #1B9C69',
    },
  }

  const theme = themes[themeName]

  for (const [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty('--' + key, value)
  }
}
