import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape, SvgIconClassKey } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { Theme } from 'reactxx-mui-web/styles/createMuiTheme'

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M12,3L2,12H5V20H19V12H22L12,3M12,8.75C13.24,8.75 14.25,9.76 14.25,11C14.25,12.24 13.24,13.25 12,13.25C10.76,13.25 9.75,12.24 9.75,11C9.75,9.76 10.76,8.75 12,8.75M12,15C13.5,15 16.5,15.75 16.5,17.25V18H7.5V17.25C7.5,15.75 10.5,15 12,15Z',
  'HomeAccount',
  true
)