import ReactN from 'react-native'
import React from 'react'

import MuiButton from 'material-ui/Button/Button'
import { muiCompatible } from '../index'

import { addOverrides } from 'reactxx'

const Button = muiCompatible<MuiButton.Shape>(MuiButton)

export const ButtonIconStart = muiCompatible<MuiButton.Shape>(addOverrides(MuiButton, { [ReactXX.CompNames.Icon]: theme => ({ root: { marginRight: theme.spacing.unit } } as ReactXX.SheetX<ReactXX.IconShape>) }))

export const ButtonIconEnd = muiCompatible<MuiButton.Shape>(addOverrides(MuiButton, { [ReactXX.CompNames.Icon]: theme => ({ root: { marginLeft: theme.spacing.unit } } as ReactXX.SheetX<ReactXX.IconShape>) }))

export default Button