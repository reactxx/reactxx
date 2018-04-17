import ReactN from 'react-native'
import React from 'react'
//import * as Cfg from 'typescript-config'

import MuiButton from 'material-ui/Button/Button'
import { muiCompatible } from '../index'
import { TTheme, CompNames, compThemeSheetModifier, ThemeModifier } from 'reactxx'
import * as Mui from '../typings/mui'
import { MuiButtonT } from '../typings/button'

import { TComps, TBasic } from 'reactxx-basic'

const ButtonIconStartOverrides: React.SFC<Mui.ButtonProps> = props => <ThemeModifier modify={compThemeSheetModifier<TComps.IconShape>(CompNames.Icon, theme => ({ root: { marginRight: theme.spacing.unit } }))}>
  <MuiButton {...props} />
</ThemeModifier>

const ButtonIconEndOverrides: React.SFC<Mui.ButtonProps> = props => <ThemeModifier modify={compThemeSheetModifier<TComps.IconShape>(CompNames.Icon, theme => ({ root: { marginLeft: theme.spacing.unit } }))}>
  <MuiButton {...props} />
</ThemeModifier>

export const ButtonIconStart = muiCompatible<MuiButtonT.Shape>(ButtonIconStartOverrides)
export const ButtonIconEnd = muiCompatible<MuiButtonT.Shape>(ButtonIconEndOverrides)

const Button = muiCompatible<MuiButtonT.Shape>(MuiButton)
export default Button


