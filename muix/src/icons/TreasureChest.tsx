import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const TreasureChestData = 'M5,4H19C20.66,4 22,5.34 22,7V11H15V10H9V11H2V7C2,5.34 3.34,4 5,4M11,11H13V13H11V11M2,12H9V13L11,15H13L15,13V12H22V20H2V12Z'
export default createSvgIcon(
  TreasureChestData,
  'TreasureChest',
  true
)