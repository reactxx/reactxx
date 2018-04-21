import ReactN from 'react-native'
import React from 'react'
import MuiButton from 'material-ui/Button/Button'

import { Types } from 'reactxx-basic'
import { TComps, TBasic, TAddInConfig, TTheme, CompNames } from 'reactxx'

import { muiCompatible } from '../index'
import * as Mui from '../typings/mui'
import { MuiButtonT } from '../typings/button'

//const ButtonIconStartOverrides: React.SFC<Mui.ButtonProps> = props => <ThemeModifier modify={compThemeSheetModifier<TComps.IconShape>(CompNames.Icon, theme => ({ root: { marginRight: theme.spacing.unit } }))}>
//  <MuiButton {...props} />
//</ThemeModifier>

//const ButtonIconEndOverrides: React.SFC<Mui.ButtonProps> = props => <ThemeModifier modify={compThemeSheetModifier<TComps.IconShape>(CompNames.Icon, theme => ({ root: { marginLeft: theme.spacing.unit } }))}>
//  <MuiButton {...props} />
//</ThemeModifier>

//TODO

const ButtonIconStartOverrides: React.SFC<Mui.ButtonProps> = props => null

const ButtonIconEndOverrides: React.SFC<Mui.ButtonProps> = props => null


export const ButtonIconStart = muiCompatible<MuiButtonT.Shape>(ButtonIconStartOverrides)
export const ButtonIconEnd = muiCompatible<MuiButtonT.Shape>(ButtonIconEndOverrides)

const Button = muiCompatible<MuiButtonT.Shape>(MuiButton)
export default Button


