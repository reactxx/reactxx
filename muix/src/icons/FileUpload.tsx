import React from 'react'
import ReactN from 'react-native';
import createSvgIcon from 'reactxx-mui-web/internal/svg-icons/create-svg-icon'
import { SvgIconProps, Shape } from 'reactxx-mui-web/SvgIcon/SvgIcon'

import { Types, TAddIn } from 'reactxx-basic'; 

export const FileUploadData = 'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z'
export default createSvgIcon(
  FileUploadData,
  'FileUpload',
  false
)