import ReactN from 'react-native'
import React from 'react'

import MuiButton from 'material-ui/Button/Button'
import PropTypes from 'prop-types'
import { muiCompatible } from '../index'

import withContext from 'recompose/withContext'

const Button = muiCompatible<MuiButton.Shape>(MuiButton)

export const ButtonIconLeft = muiCompatible<MuiButton.Shape>(withContext({ childOverrides: PropTypes.any }, props => ({
  childOverrides: { [ReactXX.CompNames.Icon]: { root: { marginRight: props.theme.spacing.unit } } } //hack
}))(MuiButton))

export const ButtonIconRight = muiCompatible<MuiButton.Shape>(withContext({ childOverrides: PropTypes.any }, props => ({
  childOverrides: { [ReactXX.CompNames.Icon]: { root: { marginLeft: props.theme.spacing.unit } } } //hack
}))(MuiButton))

export default Button