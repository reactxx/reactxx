import RN from 'react-native'
import React from 'react'

import MuiButtonBase from 'material-ui/ButtonBase/ButtonBase'
import { beforeWithStyles } from 'muix-styles/web/withStyles'

const ButtonBase = beforeWithStyles<MuiButtonBase.Shape>(MuiButtonBase as any)

export default ButtonBase

