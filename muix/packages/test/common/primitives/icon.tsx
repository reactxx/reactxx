import React from 'react'
import { Icon } from 'muix-primitives'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
import orange from 'material-ui/colors/orange'

import { Text, View } from 'muix-primitives'
import { ArrowDownBoldBox } from 'reactxx-mdi/ArrowDownBoldBox'

const theme = createMuiTheme({
  overridesX: {
    MuiIcon: {
      root: { color: orange[500] },
    }
  }
})

const app2: React.SFC = props => <AppContainer>
  <Icon children={MDI.ArrowDownBoldBox} style={{ color: 'brown' }} classes={{ root: { fontSize: 36 } }} />
</AppContainer>


const app: React.SFC = props => <View style={{ flexShrink: 0 }}>
  <Icon children={ArrowDownBoldBox} onClick={() => alert('Here I am')} />
  <Icon children={ArrowDownBoldBox} color='inherit' />
  <Icon children={ArrowDownBoldBox} color='secondary' />
  <Icon children={ArrowDownBoldBox} color='action' />
  <View style={{ backgroundColor: 'darkgray', padding: 5 }}>
    <Icon children={MDI.ArrowDownBoldBox} /*color='contrast'*/ />
  </View>
  <Icon children={MDI.ArrowDownBoldBox} color='disabled' />
  <Icon children={MDI.ArrowDownBoldBox} color='error' />
  <Icon children={MDI.ArrowDownBoldBox} color='primary' />
  <Icon children={MDI.ArrowDownBoldBox} style={{ color: 'brown' }} />
  <Icon children={MDI.ArrowDownBoldBox} classes={{ root: { color: 'green' } }} />
  <Icon children={MDI.ArrowDownBoldBox} classes={{ root: { fontSize: 32 } }} />
  <MuiThemeProvider theme={theme}>
    <View>
      <Icon children={MDI.ArrowDownBoldBox} />
      <Icon children={MDI.ArrowDownBoldBox} classes={{ root: { color: orange[200] } }} />
    </View>
  </MuiThemeProvider>
</View>

export default app
//export default app2