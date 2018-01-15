import React from 'react'
import ReactN from 'react-native'

import { muiCompatible } from 'muix-styles/web'
import MuiDrawer from 'material-ui/Drawer/Drawer'

const Drawer = muiCompatible<MuixDrawer.Shape>(MuiDrawer)
export default Drawer