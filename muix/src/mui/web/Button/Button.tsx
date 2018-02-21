import ReactN from 'react-native'
import React from 'react'

import MuiButton from 'material-ui/Button/Button'
import { muiCompatible } from '../index'

import { addOverrides } from 'reactxx'

const Button = muiCompatible<MuiButton.Shape>(MuiButton)

export const ButtonIconStart = muiCompatible<MuiButton.Shape>(addOverrides(MuiButton, (props: any) => ({ [ReactXX.CompNames.Icon]: { root: { marginRight: props.theme.spacing.unit } } })))

export const ButtonIconEnd = muiCompatible<MuiButton.Shape>(addOverrides(MuiButton, (props: any) => ({ [ReactXX.CompNames.Icon]: { root: { marginLeft: props.theme.spacing.unit } } })))

//export const ButtonIconRight2 = muiCompatible<MuiButton.Shape>(withContext({ childOverrides: PropTypes.any }, props => ({
//  childOverrides: { [ReactXX.CompNames.Icon]: { root: { marginLeft: props.theme.spacing.unit } } } //hack
//}))(MuiButton))

export default Button