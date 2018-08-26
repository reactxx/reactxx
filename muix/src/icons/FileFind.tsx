import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import React from 'react'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { SvgIconClassKey } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { Theme } from 'reactxx-mui-web/styles/createMuiTheme';

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M9,13C9,14.66 10.34,16 12,16C13.66,16 15,14.66 15,13C15,11.34 13.66,10 12,10C10.34,10 9,11.34 9,13M20,19.59V8L14,2H6C4.9,2 4,2.9 4,4V20C4,21.1 4.9,22 6,22H18C18.45,22 18.85,21.85 19.19,21.6L14.76,17.17C13.96,17.69 13,18 12,18C9.24,18 7,15.76 7,13C7,10.24 9.24,8 12,8C14.76,8 17,10.24 17,13C17,14 16.69,14.96 16.17,15.75L20,19.59Z',
  'FileFind',
  true
)