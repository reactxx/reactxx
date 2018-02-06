import React from 'react'
import ReactN from 'react-native'

import { withStyles } from 'muix-styles'
import { sheet } from '../../common/Toolbar/Toolbar'

class toolbar extends React.PureComponent<Prim5s.CodeProps<MuixToolbar.Shape>> {
  render() { return null }
}

const Toolbar = withStyles<MuixToolbar.Shape>(sheet, { name: 'MuiToolbar' })(toolbar)

export default Toolbar 