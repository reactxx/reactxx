import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const CodeBracketsData = 'M15,4V6H18V18H15V20H20V4M4,4V20H9V18H6V6H9V4H4Z'
export default createSvgIcon(
  CodeBracketsData,
  'CodeBrackets',
  true
)