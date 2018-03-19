import ReactN from 'react-native'
import React from 'react'

import MuiButtonBase from 'material-ui/ButtonBase/ButtonBase'
import { muiCompatible } from '../index'

import { MuiButtonBaseT } from '../../typings/button-base'

const ButtonBase = muiCompatible<MuiButtonBaseT.Shape>(MuiButtonBase)

export default ButtonBase

