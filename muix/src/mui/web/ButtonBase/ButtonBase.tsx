﻿import ReactN from 'react-native'
import React from 'react'

import MuiButtonBase from 'material-ui/ButtonBase/ButtonBase'
import { muiCompatible } from '../index'

import { MuiButtonBaseT } from '../../typings/button-base'
import { SheetsT, ThemeT } from 'reactxx-typings'
import * as Mui from '../../typings/mui'

const ButtonBase = muiCompatible<MuiButtonBaseT.Shape>(MuiButtonBase)

export default ButtonBase

