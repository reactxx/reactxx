import React from 'react'
import { icons } from 'muix-icons/index'
import { Icon, iconColor, iconSize } from 'muix-primitives'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
import color from 'material-ui/colors/orange'

import { Text, View, IconShape } from 'muix-primitives'

const theme = createMuiTheme({
  overridesNew: {
    MuiIcon: {
      common: {
        colorInherit: iconColor(color[500]),
      }
    } as Mui.PartialSheetX<IconShape>,
  }
})

const app: React.SFC = props =>
  <AppContainer>
    <View style={{ marginTop: 24 }}>
      <Icon children={icons.ArrowDownBoldBox} />
      <Icon children={icons.ArrowDownBoldBox} color='inherit' />
      <Icon children={icons.ArrowDownBoldBox} color='accent' />
      <Icon children={icons.ArrowDownBoldBox} color='action' />
      <View style={{ backgroundColor: 'darkgray', padding: 5 }}>
        <Icon children={icons.ArrowDownBoldBox} color='contrast' />
      </View>
      <Icon children={icons.ArrowDownBoldBox} color='disabled' />
      <Icon children={icons.ArrowDownBoldBox} color='error' />
      <Icon children={icons.ArrowDownBoldBox} color='primary' />
      <Icon children={icons.ArrowDownBoldBox} style={iconColor('brown')} />
      <Icon children={icons.ArrowDownBoldBox} classes={{ colorInherit: iconColor('green') }} />
      <Icon children={icons.ArrowDownBoldBox} classes={{ root: iconSize(32) }} />
      <MuiThemeProvider theme={theme}>
        <View>
          <Icon children={icons.ArrowDownBoldBox} />
          <Icon children={icons.ArrowDownBoldBox} classes={{ colorInherit: iconColor(color[200]) }} />
        </View>
      </MuiThemeProvider>
    </View>
  </AppContainer>

class app2 extends React.Component { render() { return <Text>HALLO</Text> } }

export default app
//export default app2