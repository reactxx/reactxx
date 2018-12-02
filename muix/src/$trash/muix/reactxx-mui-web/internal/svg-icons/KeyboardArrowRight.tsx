import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from './create-svg-icon'
import { SvgIconProps, Shape } from '../../SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const KeyboardArrowRightData = 'M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z'
export default createSvgIcon(
  KeyboardArrowRightData,
  'KeyboardArrowRight',
  false
)