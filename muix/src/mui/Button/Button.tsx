import ReactN from 'react-native'
import React from 'react'
import MuiButton, { ButtonProps } from 'material-ui/Button/Button'

import { TCommonStyles } from 'reactxx-basic'
import { Types, TAddIn, TProvider, TTheme } from 'reactxx'
import { TComps } from 'reactxx-primitives'

import { muiCompatible } from '../index'
import { Muix } from '../typings/muix'
import { MuiButtonT } from '../typings/button'

//const ButtonIconStartOverrides: React.SFC<Mui.ButtonProps> = props => <ThemeModifier modify={compThemeSheetModifier<TComps.IconShape>(CompNames.Icon, theme => ({ root: { marginRight: theme.spacing.unit } }))}>
//  <MuiButton {...props} />
//</ThemeModifier>

//const ButtonIconEndOverrides: React.SFC<Mui.ButtonProps> = props => <ThemeModifier modify={compThemeSheetModifier<TComps.IconShape>(CompNames.Icon, theme => ({ root: { marginLeft: theme.spacing.unit } }))}>
//  <MuiButton {...props} />
//</ThemeModifier>

//TODO

const ButtonIconStartOverrides: React.SFC<ButtonProps> = props => null

const ButtonIconEndOverrides: React.SFC<ButtonProps> = props => null


export const ButtonIconStart = muiCompatible<MuiButtonT.Shape>(ButtonIconStartOverrides)
export const ButtonIconEnd = muiCompatible<MuiButtonT.Shape>(ButtonIconEndOverrides)

const Button = muiCompatible<MuiButtonT.Shape>(MuiButton)
export default Button


