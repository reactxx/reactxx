import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import React from 'react'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { SvgIconClassKey } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { Theme } from 'reactxx-mui-web/styles/createMuiTheme';

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M10,9C10,8.45 10.45,8 11,8C11.55,8 12,8.45 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M11,5C13.21,5 15,6.79 15,9C15,10.5 14.2,11.77 13,12.46V11.24C13.61,10.69 14,9.89 14,9C14,7.34 12.66,6 11,6C9.34,6 8,7.34 8,9C8,9.89 8.39,10.69 9,11.24V12.46C7.8,11.77 7,10.5 7,9C7,6.79 8.79,5 11,5M11,3C14.31,3 17,5.69 17,9C17,10.7 16.29,12.23 15.16,13.33L14.16,12.88C15.28,11.96 16,10.56 16,9C16,6.24 13.76,4 11,4C8.24,4 6,6.24 6,9C6,11.05 7.23,12.81 9,13.58V14.66C6.67,13.83 5,11.61 5,9C5,5.69 7.69,3 11,3Z',
  'GestureDoubleTap',
  true
)