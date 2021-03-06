import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CloseNetworkData = 'M14.59,6L12,8.59L9.41,6L8,7.41L10.59,10L8,12.59L9.41,14L12,11.41L14.59,14L16,12.59L13.41,10L16,7.41L14.59,6M17,3C18.1,3 19,3.9 19,5V15C19,16.1 18.1,17 17,17H13V19H14C14.55,19 15,19.45 15,20H22V22H15C15,22.55 14.55,23 14,23H10C9.45,23 9,22.55 9,22H2V20H9C9,19.45 9.45,19 10,19H11V17H7C5.89,17 5,16.1 5,15V5C5,3.9 5.9,3 7,3H17Z'
export default createSvgIcon(
  CloseNetworkData,
  'CloseNetwork',
  true
)