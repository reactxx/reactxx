import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import React from 'react'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { SvgIconClassKey } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { Theme } from 'reactxx-mui-web/styles/createMuiTheme';

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M6,2C8.21,2 10,3.79 10,6V8H14V6C14,3.79 15.79,2 18,2C20.21,2 22,3.79 22,6C22,8.21 20.21,10 18,10H16V14H18C20.21,14 22,15.79 22,18C22,20.21 20.21,22 18,22C15.79,22 14,20.21 14,18V16H10V18C10,20.21 8.21,22 6,22C3.79,22 2,20.21 2,18C2,15.79 3.79,14 6,14H8V10H6C3.79,10 2,8.21 2,6C2,3.79 3.79,2 6,2M16,18C16,19.1 16.9,20 18,20C19.1,20 20,19.1 20,18C20,16.9 19.1,16 18,16H16V18M14,10H10V14H14V10M6,16C4.9,16 4,16.9 4,18C4,19.1 4.9,20 6,20C7.1,20 8,19.1 8,18V16H6M8,6C8,4.9 7.1,4 6,4C4.9,4 4,4.9 4,6C4,7.1 4.9,8 6,8H8V6M18,8C19.1,8 20,7.1 20,6C20,4.9 19.1,4 18,4C16.9,4 16,4.9 16,6V8H18Z',
  'AppleKeyboardCommand',
  true
)