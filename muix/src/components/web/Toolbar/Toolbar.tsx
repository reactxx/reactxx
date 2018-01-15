import React from 'react'
import ReactN from 'react-native'

import { muiCompatible } from 'muix-styles/web'
import MuiIconButton from 'material-ui/IconButton/IconButton'

const IconButton = muiCompatible<MuixIconButton.Shape>(MuiIconButton)
export default IconButton