import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const BloggerData = 'M14,13H9.95C9.4,13 8.95,13.45 8.95,14C8.95,14.55 9.4,15 9.95,15H14C14.55,15 15,14.55 15,14C15,13.45 14.55,13 14,13M9.95,10H12.55C13.1,10 13.55,9.55 13.55,9C13.55,8.45 13.1,8 12.55,8H9.95C9.4,8 8.95,8.45 8.95,9C8.95,9.55 9.4,10 9.95,10M16,9V10C16,10.55 16.45,11 17,11C17.55,11 18,11.45 18,12V15C18,16.66 16.66,18 15,18H9C7.34,18 6,16.66 6,15V8C6,6.34 7.34,5 9,5H13C14.66,5 16,6.34 16,8M20,2H4C2.89,2 2,2.89 2,4V20C2,21.1 2.9,22 4,22H20C21.1,22 22,21.1 22,20V4C22,2.89 21.1,2 20,2Z'
export default createSvgIcon(
  BloggerData,
  'Blogger',
  true
)