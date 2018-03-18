import { Palette as MuiPalette } from 'material-ui/styles/createPalette'
import { Style as MuiStyle, Typography as MuiTypography } from 'material-ui/styles/createTypography'
import { ThemeOptions as MuiThemeOptions, Theme as MuiTheme } from 'material-ui/styles/createMuiTheme'
import { ButtonProps as MuiButtonProps } from 'material-ui/Button/Button'
import { ButtonBaseProps as MuiButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'

declare global {
  namespace Mui {
    type Palette = MuiPalette
    type Style = MuiStyle
    type ThemeOptions = MuiThemeOptions
    type Typography = MuiTypography
    type Theme = MuiTheme
    type ButtonProps = MuiButtonProps
    type ButtonBaseProps = MuiButtonBaseProps
  }
}
