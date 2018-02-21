import ReactN from 'react-native'
import React from 'react'

import MuiButton from 'material-ui/Button/Button'
import { muiCompatible } from '../index'

//import PropTypes from 'prop-types'
//import withContext from 'recompose/withContext'

import { addOverrides } from 'reactxx'

const Button = muiCompatible<MuiButton.Shape>(MuiButton)

export const ButtonIconLeft = muiCompatible<MuiButton.Shape>(addOverrides(MuiButton, (props: any) => ({ [ReactXX.CompNames.Icon]: { root: { marginRight: props.theme.spacing.unit } } })))

export const ButtonIconRight = muiCompatible<MuiButton.Shape>(addOverrides(MuiButton, (props: any) => ({ [ReactXX.CompNames.Icon]: { root: { marginLeft: props.theme.spacing.unit } } })))

//export const ButtonIconRight2 = muiCompatible<MuiButton.Shape>(withContext({ childOverrides: PropTypes.any }, props => ({
//  childOverrides: { [ReactXX.CompNames.Icon]: { root: { marginLeft: props.theme.spacing.unit } } } //hack
//}))(MuiButton))

export default Button