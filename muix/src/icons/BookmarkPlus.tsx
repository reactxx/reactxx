import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const BookmarkPlusData = 'M17,3C18.1,3 19,3.9 19,5V21L12,18L5,21V5C5,3.89 5.9,3 7,3H17M11,7V9H9V11H11V13H13V11H15V9H13V7H11Z'
export default createSvgIcon(
  BookmarkPlusData,
  'BookmarkPlus',
  true
)