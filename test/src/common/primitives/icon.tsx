import React from 'react'
import { Icon, iconColor, iconSize } from 'muix-primitives'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
import color from 'material-ui/colors/orange'

import { View, Text } from 'react-native'

//import Cancel from 'material-ui/svg-MuixIcons/Cancel'

//const app2: React.SFC = props => <div>
//  <h1><span style={{ display: 'inline-block', verticalAlign: 'middle' }}><Cancel style={{ height: '1em', width: '1em', }} /></span>Xxxx</h1>
//  <h2><Cancel style={{ height: '1em', width: '1em', display: 'inline-block', verticalAlign: 'middle' }} />Xxxxx</h2>
//  <h3><Cancel style={{ height: '1em', width: '1em' }} />Xxxxx</h3>
//  <h4><Cancel style={{ height: '1em', width: '1em' }} />Xxxxx</h4>
//</div>


const theme = createMuiTheme({
  overridesNew: {
    //MuiIcon: {
    //  common: {
    //    colorInherit: iconColor(color[500]),
    //  }
    //}
    //[Mui.Names.Icon]: {
    //  common: {
    //    colorInherit: iconColor(color[500]),
    //  }
    //} as Mui.Sheet<MuiIcon.Shape>
  }
})

const app: React.SFC = props =>
  <AppContainer>
    <View style={{ marginTop: 24 }}>
      <Icon children={MuixIcons.ArrowDownBoldBox} />
      <Icon children={MuixIcons.ArrowDownBoldBox} color='inherit' />
      <Icon children={MuixIcons.ArrowDownBoldBox} color='accent' />
      <Icon children={MuixIcons.ArrowDownBoldBox} color='action' />
      <View style={{ backgroundColor: 'darkgray', padding: 5 }}>
        <Icon children={MuixIcons.ArrowDownBoldBox} color='contrast' />
      </View>
      <Icon children={MuixIcons.ArrowDownBoldBox} color='disabled' />
      <Icon children={MuixIcons.ArrowDownBoldBox} color='error' />
      <Icon children={MuixIcons.ArrowDownBoldBox} color='primary' />
      <Icon children={MuixIcons.ArrowDownBoldBox} style={iconColor('brown')} />
      <Icon children={MuixIcons.ArrowDownBoldBox} classes={{ colorInherit: iconColor('green') }} />
      <Icon children={MuixIcons.ArrowDownBoldBox} classes={{ root: iconSize(32) }} />
      <MuiThemeProvider theme={theme}>
        <Icon children={MuixIcons.ArrowDownBoldBox} />
      </MuiThemeProvider>
    </View>
  </AppContainer>

class app2 extends React.Component { render() { return <Text>HALLO</Text> } }

export default app
//export default app2