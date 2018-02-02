import React from 'react'
import { Icon } from 'muix-primitives'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
import orange from 'material-ui/colors/orange'

import { Text, View } from 'muix-primitives'
import { ArrowDownBoldBox } from 'muix-icons/ArrowDownBoldBox'

const theme = createMuiTheme({
  overridesX: {
    MuiIcon: {
      root: { color: orange[500] },
    }
  }
})

const app2: React.SFC = props => <AppContainer>
  <Icon children={MuixIcons.ArrowDownBoldBox} style={{ color: 'brown' }} classes={{ root: { fontSize: 36 } }} />
</AppContainer>


const app: React.SFC = props => <View style={{ flexShrink: 0 }}>
  <Icon children={ArrowDownBoldBox} onClick={() => alert('Here I am')} />
  <Icon children={ArrowDownBoldBox} color='inherit' />
  <Icon children={ArrowDownBoldBox} color='secondary' />
  <Icon children={ArrowDownBoldBox} color='action' />
  <View style={{ backgroundColor: 'darkgray', padding: 5 }}>
    <Icon children={MuixIcons.ArrowDownBoldBox} /*color='contrast'*/ />
  </View>
  <Icon children={MuixIcons.ArrowDownBoldBox} color='disabled' />
  <Icon children={MuixIcons.ArrowDownBoldBox} color='error' />
  <Icon children={MuixIcons.ArrowDownBoldBox} color='primary' />
  <Icon children={MuixIcons.ArrowDownBoldBox} style={{ color: 'brown' }} />
  <Icon children={MuixIcons.ArrowDownBoldBox} classes={{ root: { color: 'green' } }} />
  <Icon children={MuixIcons.ArrowDownBoldBox} classes={{ root: { fontSize: 32 } }} />
  <MuiThemeProvider theme={theme}>
    <View>
      <Icon children={MuixIcons.ArrowDownBoldBox} />
      <Icon children={MuixIcons.ArrowDownBoldBox} classes={{ root: { color: orange[200] } }} />
    </View>
  </MuiThemeProvider>
</View>

export default app
//export default app2