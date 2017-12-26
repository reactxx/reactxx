﻿import ReactN from 'react-native'
import React from 'react'

import MuiButton from 'material-ui/Button/Button'
import { withStylesX } from 'muix-styles/web'
import { Shape } from '../../common/Button/Button'

//const Button = withStyles<MuiButton.Shape>(styles, { name: Mui.Names.Typography })(MuiButton)
const Button = withStylesX<Shape>(MuiButton)

//const x = <Button classes={{ common: {}, native: {} }} onClick={ev => ev && ev.preventDefault()} />

export default Button