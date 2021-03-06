import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const AccountOutlineData = 'M12,13C9.33,13 4,14.33 4,17V20H20V17C20,14.33 14.67,13 12,13M12,4C9.79,4 8,5.79 8,8C8,10.21 9.79,12 12,12C14.21,12 16,10.21 16,8C16,5.79 14.21,4 12,4M12,14.9C14.97,14.9 18.1,16.36 18.1,17V18.1H5.9V17C5.9,16.36 9,14.9 12,14.9M12,5.9C13.16,5.9 14.1,6.84 14.1,8C14.1,9.16 13.16,10.1 12,10.1C10.84,10.1 9.9,9.16 9.9,8C9.9,6.84 10.84,5.9 12,5.9Z'
export default createSvgIcon(
  AccountOutlineData,
  'AccountOutline',
  true
)