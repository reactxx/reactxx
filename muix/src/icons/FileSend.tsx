import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FileSendData = 'M14,2H6C4.89,2 4,2.89 4,4V20C4,21.1 4.9,22 6,22H18C19.1,22 20,21.1 20,20V8L14,2M12.54,19.37V17.37H8.54V15.38H12.54V13.38L15.54,16.38L12.54,19.37M13,9V3.5L18.5,9H13Z'
export default createSvgIcon(
  FileSendData,
  'FileSend',
  true
)