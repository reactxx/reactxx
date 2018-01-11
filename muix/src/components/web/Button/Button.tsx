import ReactN from 'react-native'
import React from 'react'

import MuiButton from 'material-ui/Button/Button'
import { muiCompatible } from 'muix-styles/web'

const Button = muiCompatible<MuixButton.Shape>(MuiButton)

export default Button