import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const AccountCheckData = 'M9,5C10.93,5 12.5,6.57 12.5,8.5C12.5,10.43 10.93,12 9,12C7.07,12 5.5,10.43 5.5,8.5C5.5,6.57 7.07,5 9,5M9,13.75C12.87,13.75 16,15.32 16,17.25V19H2V17.25C2,15.32 5.13,13.75 9,13.75M17,12.66L14.25,9.66L15.41,8.5L17,10.09L20.59,6.5L21.75,7.91L17,12.66Z'
export default createSvgIcon(
  AccountCheckData,
  'AccountCheck',
  true
)