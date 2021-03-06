import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const PandoraData = 'M10,20C10,20.55 9.55,21 9,21H4V3H13.71C17.44,3 20.46,6.02 20.46,9.75C20.46,13.5 17.44,16.5 13.71,16.5H10V20Z'
export default createSvgIcon(
  PandoraData,
  'Pandora',
  true
)