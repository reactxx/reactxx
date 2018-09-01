import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FlagData = 'M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z'
export default createSvgIcon(
  FlagData,
  'Flag',
  false
)