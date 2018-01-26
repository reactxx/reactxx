import React from 'react'
import ReactN from 'react-native'

import { muiCompatible } from 'muix-styles/web'
import MuiAppBar from 'material-ui/AppBar/AppBar'

const AppBar = muiCompatible<MuixAppBar.Shape>(MuiAppBar)
export default AppBar