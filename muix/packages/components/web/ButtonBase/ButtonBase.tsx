import ReactN from 'react-native'
import React from 'react'

import MuiButtonBase from 'material-ui/ButtonBase/ButtonBase'
import { muiCompatible } from 'muix-styles/web'

const ButtonBase = muiCompatible<MuixButtonBase.Shape>(MuiButtonBase as any)

export default ButtonBase

