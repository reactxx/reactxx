import React from 'react'
import Button, { ButtonIconLeft, ButtonIconRight } from 'muix-components/Button/Button'
import { Icon } from 'muix-primitives'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
//import color from 'material-ui/colors/orange'

import { View } from 'muix-primitives'

//import Cancel from 'material-ui/svg-icons/Cancel' 

//const theme = createMuiTheme({
//  overrides: {
//    [Mui.Names.Icon]: {
//      common: {
//        colorInherit: {color: color[500]), 
//      }
//    } as Mui.Sheet<MuiIcon.ISheet>
//  }
//})

const app: React.SFC = props => <AppContainer>
  <View style={{ padding: 10, backgroundColor: 'lightgray' }}>
    <View style={{ padding: 10, backgroundColor: 'yellow' }}>
      <ButtonIconLeft color='primary' raised onClick={ev => ev && ev.preventDefault()} style={{ marginBottom: 10 }}><Icon children={MuixIcons.ArrowDownBoldBox} />Hallo Icon Left Button</ButtonIconLeft>
      <ButtonIconRight color='primary' raised onClick={ev => ev && ev.preventDefault()}>Hallo Icon Right Button<Icon children={MuixIcons.ArrowDownBoldBox} /></ButtonIconRight>
    </View>
  </View>
</AppContainer>

export default app
//export default app2