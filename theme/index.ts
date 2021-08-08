import { createTheme, ThemeOptions } from '@material-ui/core'

import palette from './palette'
import shadows from './shadows'
import typography from './typography'

const theme = createTheme({
  palette,
  shadows,
  typography,
} as ThemeOptions)

export default theme
