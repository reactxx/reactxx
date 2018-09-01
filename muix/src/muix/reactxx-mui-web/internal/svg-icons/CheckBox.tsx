import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from './create-svg-icon'
import { SvgIconProps, Shape } from '../../SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CheckBoxData = 'M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z'
export default createSvgIcon(
  CheckBoxData,
  'CheckBox',
  false
)