import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import React from 'react'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { SvgIconClassKey } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { Theme } from 'reactxx-mui-web/styles/createMuiTheme';

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M7,2L11,6H8V10H6V6H3L7,2M17,10L13,6H16V2H18V6H21L17,10M7,12H17C18.1,12 19,12.9 19,14V20C19,21.1 18.1,22 17,22H7C5.9,22 5,21.1 5,20V14C5,12.9 5.9,12 7,12M7,14V20H17V14H7Z',
  'Elevator',
  true
)