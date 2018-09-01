import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FolderMultipleImageData = 'M7,15L11.5,9L15,13.5L17.5,10.5L21,15M22,4H14L12,2H6C4.9,2 4,2.9 4,4V16C4,17.1 4.9,18 6,18H22C23.1,18 24,17.1 24,16V6C24,4.9 23.1,4 22,4M2,6H0V11H0V20C0,21.1 0.9,22 2,22H20V20H2V6Z'
export default createSvgIcon(
  FolderMultipleImageData,
  'FolderMultipleImage',
  true
)