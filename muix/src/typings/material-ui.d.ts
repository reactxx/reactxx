import { Palette as MuiPalette} from 'material-ui/styles/createPalette'
import { Style as MuiStyle, Typography as MuiTypography } from 'material-ui/styles/createTypography'
import { Theme as MuiTheme, ThemeOptions as MuiThemeOptions} from 'material-ui/styles/createMuiTheme'
import { ButtonProps as MuiButtonProps} from 'material-ui/Button/Button'
import { ButtonBaseProps as MuiButtonBaseProps} from 'material-ui/ButtonBase/ButtonBase'
import { StyledComponentProps as MuiStyledComponentProps } from 'material-ui/styles/withStyles'

export = Mui
export as namespace Mui

declare namespace Mui {
  type Palette = MuiPalette
  type Style = MuiStyle
  type ThemeOptions = MuiThemeOptions
  type Theme = MuiTheme
  type Typography = MuiTypography
  type ButtonProps = MuiButtonProps
  type ButtonBaseProps = MuiButtonBaseProps
  type StyledComponentProps<ClassKey extends string = string> = MuiStyledComponentProps<ClassKey>
}

