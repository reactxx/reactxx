import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const AddData = 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z'
export default createSvgIcon(
  AddData,
  'Add',
  false
)