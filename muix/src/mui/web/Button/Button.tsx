import * as ReactN from 'react-native'
import * as React from 'react'

import MuiButton from 'material-ui/Button/Button'
import { muiCompatible } from '../index'
import { compThemeSheetModifier, ThemeModifier } from 'reactxx'

const ButtonIconStartOverrides: React.SFC<Mui.ButtonProps> = props => <ThemeModifier modify={compThemeSheetModifier<ReactXX.IconShape>(ReactXX.CompNames.Icon, theme => ({ root: { marginRight: theme.spacing.unit } }))}>
  <MuiButton {...props} />
</ThemeModifier>

const ButtonIconEndOverrides: React.SFC<Mui.ButtonProps> = props => <ThemeModifier modify={compThemeSheetModifier<ReactXX.IconShape>(ReactXX.CompNames.Icon, theme => ({ root: { marginLeft: theme.spacing.unit } }))}>
  <MuiButton {...props} />
</ThemeModifier>

export const ButtonIconStart = muiCompatible<MuiButton.Shape>(ButtonIconStartOverrides)
export const ButtonIconEnd = muiCompatible<MuiButton.Shape>(ButtonIconEndOverrides)

const Button = muiCompatible<MuiButton.Shape>(MuiButton)
export default Button

//export const ButtonIconStart = muiCompatible<MuiButton.Shape>(addOverrides(MuiButton, { [ReactXX.CompNames.Icon]: theme => ({ root: { marginRight: theme.spacing.unit } } as ReactXX.SheetX<ReactXX.IconShape>) }))
//export const ButtonIconEnd = muiCompatible<MuiButton.Shape>(addOverrides(MuiButton, { [ReactXX.CompNames.Icon]: theme => ({ root: { marginLeft: theme.spacing.unit } } as ReactXX.SheetX<ReactXX.IconShape>) }))

