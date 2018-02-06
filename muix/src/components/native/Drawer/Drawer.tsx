import React from 'react'
import ReactN from 'react-native'

import { withStyles } from 'muix-styles'
import { sheet } from '../../common/Drawer/Drawer'

class drawer extends React.PureComponent<Prim5s.CodeProps<MuixDrawer.Shape>> {
  render() { return null }
}

const Drawer = withStyles<MuixDrawer.Shape>(sheet, { name: 'MuiDrawer' })(drawer)

export default Drawer 