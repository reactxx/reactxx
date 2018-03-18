import * as pal from 'material-ui/styles/createPalette'
import * as typo from 'material-ui/styles/createTypography'
import * as th from 'material-ui/styles/createMuiTheme'
import * as btn from 'material-ui/Button/Button'
import * as btnBase from 'material-ui/ButtonBase/ButtonBase'

export = Mui
export as namespace Mui

declare namespace Mui {
  type Palette = pal.Palette
  type Style = typo.Style
  type ThemeOptions = th.ThemeOptions
  type Typography = typo.Typography
  type Theme = th.Theme
  type ButtonProps = btn.ButtonProps
  type ButtonBaseProps = btnBase.ButtonBaseProps
}

