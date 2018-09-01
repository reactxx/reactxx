import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PianoData = 'M4,3H20C21.1,3 22,3.9 22,5V19C22,20.1 21.1,21 20,21H4C2.9,21 2,20.1 2,19V5C2,3.9 2.9,3 4,3M4,5V19H8V13H6.75V5H4M9,19H15V13H13.75V5H10.25V13H9V19M16,19H20V5H17.25V13H16V19Z'
export default createSvgIcon(
  PianoData,
  'Piano',
  true
)