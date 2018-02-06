import React from 'react'
import ReactN from 'react-native'

import { withStyles } from 'muix-styles'
import { sheet } from '../../common/AppBar/AppBar'

class appBar extends React.PureComponent<Prim5s.CodeProps<MuixAppBar.Shape>> {
  render() { return null }
}

const AppBar = withStyles<MuixAppBar.Shape>(sheet, { name: 'MuiAppBar' })(appBar)

export default AppBar 