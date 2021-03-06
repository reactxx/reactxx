import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const RadioTowerData = 'M12,10C13.1,10 14,10.9 14,12C14,12.5 13.82,12.94 13.53,13.29L16.7,22H14.57L12,14.93L9.43,22H7.3L10.47,13.29C10.18,12.94 10,12.5 10,12C10,10.9 10.9,10 12,10M12,8C9.79,8 8,9.79 8,12C8,12.5 8.1,13 8.28,13.46L7.4,15.86C6.53,14.81 6,13.47 6,12C6,8.69 8.69,6 12,6C15.31,6 18,8.69 18,12C18,13.47 17.47,14.81 16.6,15.86L15.72,13.46C15.9,13 16,12.5 16,12C16,9.79 14.21,8 12,8M12,4C7.58,4 4,7.58 4,12C4,14.36 5,16.5 6.64,17.94L5.92,19.94C3.54,18.11 2,15.23 2,12C2,6.48 6.48,2 12,2C17.52,2 22,6.48 22,12C22,15.23 20.46,18.11 18.08,19.94L17.36,17.94C19,16.5 20,14.36 20,12C20,7.58 16.42,4 12,4Z'
export default createSvgIcon(
  RadioTowerData,
  'RadioTower',
  true
)