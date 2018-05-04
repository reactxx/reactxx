import ReactN from 'react-native'
import React from 'react'
import MuiButtonBase, { ButtonBaseProps } from 'material-ui/ButtonBase/ButtonBase'

import { Properties } from 'csstype'
import { TCommonStyles } from 'reactxx-basic'
import { TAddIn, TProvider, Types, TTheme } from 'reactxx'

import { muiCompatible } from '../index'
import { MuiButtonBaseT } from '../typings/button-base'
import { Muix } from '../typings/muix'

const ButtonBase = muiCompatible<MuiButtonBaseT.Shape>(MuiButtonBase)

export default ButtonBase

