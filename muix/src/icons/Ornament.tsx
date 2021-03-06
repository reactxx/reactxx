import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const OrnamentData = 'M12,1C13.66,1 15,2.34 15,4V5C15.55,5 16,5.45 16,6V7.07C18.39,8.45 20,11.04 20,14C20,18.42 16.42,22 12,22C7.58,22 4,18.42 4,14C4,11.04 5.61,8.45 8,7.07V6C8,5.45 8.45,5 9,5V4C9,2.34 10.34,1 12,1M12,3C11.45,3 11,3.45 11,4V5H13V4C13,3.45 12.55,3 12,3M12,8C10.22,8 8.63,8.77 7.53,10H16.47C15.37,8.77 13.78,8 12,8M6.34,16H7.59L6,14.43C6.05,15 6.17,15.5 6.34,16M12.59,16L8.59,12H6.41L10.41,16H12.59M17.66,12H16.41L18,13.57C17.95,13 17.83,12.5 17.66,12M11.41,12L15.41,16H17.59L13.59,12H11.41M12,20C13.78,20 15.37,19.23 16.47,18H7.53C8.63,19.23 10.22,20 12,20Z'
export default createSvgIcon(
  OrnamentData,
  'Ornament',
  true
)