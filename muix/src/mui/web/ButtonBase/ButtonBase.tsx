import * as ReactN from 'react-native'
import * as React from 'react'

import MuiButtonBase from 'material-ui/ButtonBase/ButtonBase'
import { muiCompatible } from '../index'

const ButtonBase = muiCompatible<MuiButtonBase.Shape>(MuiButtonBase)

export default ButtonBase

