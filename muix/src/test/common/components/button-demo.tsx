import React from 'react'
import Button from 'muix-components/Button/Button'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
//import color from 'material-ui/colors/orange'

import { View } from 'muix-primitives'

//import Cancel from 'material-ui/svg-icons/Cancel'

const theme = createMuiTheme({
  overridesNew: theme => ({
    MuiButton: {
      common: {
        margin: theme.spacing.unit
      }
    },
  })
})


const app: React.SFC = props => <AppContainer themeOptions={{ overridesNew: theme => ({ MuiButton: { common: { root: { margin: theme.spacing.unit } } } }) }}>
  <View style={{ marginTop: 40 }}>
    <Button >Default</Button>
    <Button color="primary" >
      Primary
      </Button>
    <Button color="accent" >
      Accent
      </Button>
    <Button color="contrast" >
      Contrast
      </Button>
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
</AppContainer>

export default app
//export default app2