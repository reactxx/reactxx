import React from 'react'
import ReactN from 'react-native'

import { muiCompatible } from 'muix-styles/web'
import MuiToolbar from 'material-ui/Toolbar/Toolbar'

const Toolbar = muiCompatible<MuixIconButton.Shape>(MuiToolbar)
export default Toolbar