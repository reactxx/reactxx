import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const GoogleWalletData = 'M15.44,2.56H20.24C20.24,2.56 23.12,11.36 20.24,21.5H15.5C15.5,21.5 15.12,16.8 13.28,12.8C13.28,12.8 12.5,16.08 11.6,18H6.72C6.72,18 5.76,13.44 2.5,9.5H7.28C7.28,9.5 8.16,10.4 8.88,11.6C8.88,11.6 9.5,9.12 9.5,6H14.32C14.32,6 15.92,8.32 16.64,9.76C16.64,9.76 16.4,6.24 15.44,2.56Z'
export default createSvgIcon(
  GoogleWalletData,
  'GoogleWallet',
  true
)