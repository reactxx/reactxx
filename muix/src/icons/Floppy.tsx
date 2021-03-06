import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FloppyData = 'M5,3C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5.5L18.5,3H17V9C17,9.55 16.55,10 16,10H8C7.45,10 7,9.55 7,9V3H5M12,4V9H15V4H12M7,12H17C17.55,12 18,12.45 18,13V19H6V13C6,12.45 6.45,12 7,12Z'
export default createSvgIcon(
  FloppyData,
  'Floppy',
  true
)