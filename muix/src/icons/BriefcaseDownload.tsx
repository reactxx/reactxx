import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const BriefcaseDownloadData = 'M10,2H14C15.1,2 16,2.9 16,4V6H20C21.1,6 22,6.9 22,8V19C22,20.1 21.1,21 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14M12,19L17,14H14V10H10V14H7L12,19Z'
export default createSvgIcon(
  BriefcaseDownloadData,
  'BriefcaseDownload',
  true
)