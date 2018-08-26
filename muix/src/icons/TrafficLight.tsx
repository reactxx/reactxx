import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import React from 'react'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { SvgIconClassKey } from 'reactxx-mui-web/SvgIcon/SvgIcon'
import { Theme } from 'reactxx-mui-web/styles/createMuiTheme';

import { Types, TCommon, TAddIn, TCommonStyles } from 'reactxx-basic'; 
    
export default createSvgIcon(
  'M12,9C10.9,9 10,8.1 10,7C10,5.89 10.9,5 12,5C13.11,5 14,5.89 14,7C14,8.1 13.1,9 12,9M12,14C10.9,14 10,13.1 10,12C10,10.89 10.9,10 12,10C13.11,10 14,10.89 14,12C14,13.1 13.1,14 12,14M12,19C10.9,19 10,18.1 10,17C10,15.89 10.9,15 12,15C13.11,15 14,15.89 14,17C14,18.1 13.1,19 12,19M20,10H17V8.86C18.72,8.41 20,6.86 20,5H17V4C17,3.45 16.55,3 16,3H8C7.45,3 7,3.45 7,4V5H4C4,6.86 5.28,8.41 7,8.86V10H4C4,11.86 5.28,13.41 7,13.86V15H4C4,16.86 5.28,18.41 7,18.86V20C7,20.55 7.45,21 8,21H16C16.55,21 17,20.55 17,20V18.86C18.72,18.41 20,16.86 20,15H17V13.86C18.72,13.41 20,11.86 20,10Z',
  'TrafficLight',
  true
)