import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import React from 'react'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { SvgIconClassKey } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { Theme } from 'reactxx-mui-web/styles/createMuiTheme';

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M2,6V8H14V6H2M2,10V12H11V10H2M14.17,10.76L12.76,12.17L15.59,15L12.76,17.83L14.17,19.24L17,16.41L19.83,19.24L21.24,17.83L18.41,15L21.24,12.17L19.83,10.76L17,13.59L14.17,10.76M2,14V16H11V14H2Z',
  'PlaylistRemove',
  true
)