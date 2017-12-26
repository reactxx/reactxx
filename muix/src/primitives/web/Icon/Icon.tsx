import React from 'react'
import { icons } from 'muix-icons/index'

import { classNames, withStyles } from 'muix-styles/web'
import { getClasses, sheet, Shape } from '../../common/Icon/Icon' 

import SvgIcon, { SvgIconProps } from 'material-ui/SvgIcon/SvgIcon'

const icon: Mui.CodeSFCWeb<Shape> = (props => {
  const { classes: { iconClass }, name, style, rest, innerRef } = getClasses<string>(props as Mui.CodeProps<Shape>)
  return <SvgIcon className={classNames(iconClass)} style={style} ref={div => innerRef && innerRef(div)} {...rest}>
    <path d={name} />
  </SvgIcon>
}) 

const Icon = withStyles<Shape>(sheet, { name: 'MuiIcon' })(icon)

export default Icon

