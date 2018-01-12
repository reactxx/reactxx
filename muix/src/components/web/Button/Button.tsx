import ReactN from 'react-native'
import React from 'react'

import MuiButton from 'material-ui/Button/Button'
import { muiCompatible } from 'muix-styles/web'
import withContext from 'recompose/withContext'
import PropTypes from 'prop-types'

const Button = muiCompatible<MuixButton.Shape>(MuiButton)

export const ButtonIconLeft = muiCompatible<MuixButton.Shape>(withContext({ childOverrides: PropTypes.any }, props => ({
  childOverrides: { MuiIcon: { root: { marginRight: props.theme.spacing.unit } } } //hack
}))(MuiButton))

export const ButtonIconRight = muiCompatible<MuixButton.Shape>(withContext({ childOverrides: PropTypes.any }, props => ({
  childOverrides: { MuiIcon: { root: { marginLeft: props.theme.spacing.unit } } } //hack
}))(MuiButton))

export default Button