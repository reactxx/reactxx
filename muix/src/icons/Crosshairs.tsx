import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import React from 'react'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { SvgIconClassKey } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { Theme } from 'reactxx-mui-web/styles/createMuiTheme';

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M3.05,13H1V11H3.05C3.5,6.83 6.83,3.5 11,3.05V1H13V3.05C17.17,3.5 20.5,6.83 20.95,11H23V13H20.95C20.5,17.17 17.17,20.5 13,20.95V23H11V20.95C6.83,20.5 3.5,17.17 3.05,13M12,5C8.13,5 5,8.13 5,12C5,15.87 8.13,19 12,19C15.87,19 19,15.87 19,12C19,8.13 15.87,5 12,5Z',
  'Crosshairs',
  true
)