import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from './create-svg-icon'
import { SvgIconProps, Shape } from '../../SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const KeyboardArrowLeftData = 'M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z'
export default createSvgIcon(
  KeyboardArrowLeftData,
  'KeyboardArrowLeft',
  false
)