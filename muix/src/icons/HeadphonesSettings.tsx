import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const HeadphonesSettingsData = 'M12,1C16.97,1 21,5.03 21,10V17C21,18.66 19.66,20 18,20H15V12H19V10C19,6.13 15.87,3 12,3C8.13,3 5,6.13 5,10V12H9V20H6C4.34,20 3,18.66 3,17V10C3,5.03 7.03,1 12,1M15,24V22H17V24H15M11,24V22H13V24H11M7,24V22H9V24H7Z'
export default createSvgIcon(
  HeadphonesSettingsData,
  'HeadphonesSettings',
  true
)