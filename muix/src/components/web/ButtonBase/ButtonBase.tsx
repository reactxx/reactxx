﻿import ReactN from 'react-native'
import React from 'react'

import MuiButtonBase from 'material-ui/ButtonBase/ButtonBase'
import { withStylesX } from 'muix-styles/web'
//import { Shape } from '../../common/ButtonBase/ButtonBase'

//export type ButtonBaseShape = Shape

const ButtonBase = withStylesX<ButtonBase.Shape>(MuiButtonBase as any)

export default ButtonBase

