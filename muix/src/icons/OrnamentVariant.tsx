import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const OrnamentVariantData = 'M12,1C13.66,1 15,2.34 15,4V5C15.55,5 16,5.45 16,6V7.07C18.39,8.45 20,11.04 20,14C20,18.42 16.42,22 12,22C7.58,22 4,18.42 4,14C4,11.04 5.61,8.45 8,7.07V6C8,5.45 8.45,5 9,5V4C9,2.34 10.34,1 12,1M12,3C11.45,3 11,3.45 11,4V5H13V4C13,3.45 12.55,3 12,3M12,8C10.22,8 8.63,8.77 7.53,10H16.47C15.37,8.77 13.78,8 12,8M12,20C13.78,20 15.37,19.23 16.47,18H7.53C8.63,19.23 10.22,20 12,20M12,12C10.9,12 10,12.9 10,14C10,15.1 10.9,16 12,16C13.1,16 14,15.1 14,14C14,12.9 13.1,12 12,12M18,14C18,13.31 17.88,12.65 17.67,12C16.72,12.19 16,13 16,14C16,15 16.72,15.81 17.67,15.97C17.88,15.35 18,14.69 18,14M6,14C6,14.69 6.12,15.35 6.33,15.97C7.28,15.81 8,15 8,14C8,13 7.28,12.19 6.33,12C6.12,12.65 6,13.31 6,14Z'
export default createSvgIcon(
  OrnamentVariantData,
  'OrnamentVariant',
  true
)