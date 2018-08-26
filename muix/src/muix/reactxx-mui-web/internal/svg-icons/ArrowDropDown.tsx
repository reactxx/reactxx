import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from './create-svg-icon'
import { SvgIconProps, Shape, SvgIconClassKey } from '../../SvgIcon/SvgIcon'
import { Theme } from '../../styles/createMuiTheme'

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M7 10l5 5 5-5z',
  'ArrowDropDown',
  false
)