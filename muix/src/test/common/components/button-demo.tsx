import React from 'react'
import Button from 'muix-components/Button/Button'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
//import color from 'material-ui/colors/orange'

import { ScrollView, View } from 'muix-primitives'

//import Cancel from 'material-ui/svg-icons/Cancel'

const theme = createMuiTheme({
  overridesNew: theme => ({
    MuiButton: {
      common: {
        root: {
          margin: theme.spacing.unit
        }
      }
    },
  })
})


const app: React.SFC = props => <AppContainer themeOptions={{ overridesNew: theme => ({ MuiButton: { common: { root: { margin: theme.spacing.unit, flexShrink: 0 } } } }) }}>
  <ScrollView>
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', alignItems: 'flex-start', marginTop:24 }}>
      <Button>Default</Button>
      <Button color="primary" >
        Primary
      </Button>
      <Button color="accent" >
        Accent
      </Button>
      <View style={{ backgroundColor: theme.palette.common.black }}>
        <Button color="contrast" >
          Contrast
      </Button>
      </View>
      <Button disabled >
        Disabled
      </Button>
      <Button href="#flat-buttons" >
        Link
      </Button>
      <Button disabled href="/" >
        Link disabled
      </Button>
      <Button dense >
        Dense
      </Button>
      <Button onClick={() => alert('here I am')} >
        Does something
      </Button>
    </View>
  </ScrollView>
</AppContainer>

export default app
//export default app2