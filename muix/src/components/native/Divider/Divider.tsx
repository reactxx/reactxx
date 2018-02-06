import React from 'react'
import ReactN from 'react-native'

import { withStyles } from 'muix-styles'
import { sheet } from '../../common/Divider/Divider'

class divider extends React.PureComponent<Prim5s.CodeProps<MuixDivider.Shape>> {
  render() { return null }
}

const Divider = withStyles<MuixDivider.Shape>(sheet, { name: 'MuiDivider' })(divider)

export default Divider 