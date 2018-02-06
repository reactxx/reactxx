import React from 'react'
import ReactN from 'react-native'

import { withStyles } from 'muix-styles'
import { sheet } from '../../common/Hidden/Hidden'

class hidden extends React.PureComponent<Muix2.CodeProps<MuixHidden.Shape>> {
  render() { return null }
}

const Hidden = withStyles<MuixHidden.Shape>(sheet, { name: 'MuiHidden' })(hidden)

export default Hidden 

