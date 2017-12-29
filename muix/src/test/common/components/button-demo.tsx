import React from 'react'
import Button from 'muix-components/Button/Button'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
//import color from 'material-ui/colors/orange'

import { ScrollView, View, Icon } from 'muix-primitives'

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

const rootView: ReactN.ViewStyle = { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', paddingTop: 24, flex: 1, /*alignItems: 'flex-start'  shifts button label*/ }

const app2: React.SFC = props => <AppContainer themeOptions={{ overridesNew: theme => ({ MuiButton: { common: { root: { margin: theme.spacing.unit, flexShrink: 0 } } } }) }}>
  <View classes={{ root: rootView }} >
    <Button raised color="primary">
      Primary
    </Button>
  </View>
</AppContainer>

const app: React.SFC = props => <AppContainer themeOptions={{ overridesNew: theme => ({ MuiButton: { common: { root: { margin: theme.spacing.unit, flexShrink: 0 } } } }) }}>
  <ScrollView>
    <View classes={{ root: rootView }} >
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
    <View classes={{ root: rootView }} >
      <Button raised>
        Default
      </Button>
      <Button raised color="primary">
        Primary
      </Button>
      <Button raised color="accent">
        Accent
      </Button>
      <Button raised color="contrast">
        Contrast
      </Button>
      <Button raised color="accent" disabled>
        Disabled
      </Button>
      {/*<input
        accept="image/*"
        className={classes.input}
        id="raised-button-file"
        multiple
        type="file"
      />
      <label htmlFor="raised-button-file">
        <Button raised component="span">
          Upload
        </Button>
      </label>*/}
      <Button raised dense>
        Dense
      </Button>
    </View>
    <View classes={{ root: rootView }} >
      <Button fab color="primary">
        <Icon>{MuixIcons.Plus}</Icon>
      </Button>
      <Button fab mini color="primary">
        <Icon>{MuixIcons.Plus}</Icon>
      </Button>
      <Button fab color="accent">
        <Icon>{MuixIcons.Pencil}</Icon>
      </Button>
      <Button fab mini color="accent">
        <Icon>{MuixIcons.Pencil}</Icon>
      </Button>
      <Button fab disabled>
        <Icon>{MuixIcons.Delete}</Icon>
      </Button>
      <Button fab mini disabled>
        <Icon>{MuixIcons.Delete}</Icon>
      </Button>
    </View>
  </ScrollView>
</AppContainer>

export default app
//export default app2