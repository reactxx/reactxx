import React from 'react'

import Icons from './icons/index'
import TypographyTest from './styles/typography'
import TextView from './primitives/text-view'
import Icon from './primitives/icon'
import ButtonTest from './components/button'
import ResponsibleDrawer from './components/responsible-drawer'
import Shadows from './shadows/index'
import ComponentX from './styles/component-x'
import ButtonDemo, { overridesNew } from './components/button-demo'

import { ScrollView, View, Text, Typography } from 'muix-primitives'
import { AppContainer, MuiThemeProvider, createMuiTheme } from 'muix-styles'
import Button from 'muix-components/Button/Button'

const apps: { title: string; app: React.ComponentType, overridesNew?: Muix.ThemeValueOrCreator<Muix.OverridesX> }[] = [
  { title: 'ResponsibleDrawer', app: ResponsibleDrawer },
  { title: 'Typography', app: TypographyTest },
  { title: 'ButtonDemo', app: ButtonDemo, overridesNew },
  { title: 'Button', app: ButtonTest },
  { title: 'Icons', app: Icons },
  { title: 'TextView', app: TextView },
  { title: 'Icon', app: Icon },
  //{ title: 'Shadows', app: Shadows },
  { title: 'ComponentX', app: ComponentX },
]

const theme = createMuiTheme({
  palette: {
    type: 'dark', // Switching the dark mode on is a single property value change.
  }
})

class AppRoot extends React.Component {
  state = { appIndex: 0, rtl: false, light: false }
  render() {
    const { appIndex } = this.state
    const App = apps[appIndex].app
    const root = <View style={{ flex: 1, paddingTop:24 }}>
      <MuiThemeProvider theme={theme}>
        <View classes={theme => ({ root: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: theme.palette.background.appBar, flexShrink: 0 } })}>
          {apps.map((app, idx) => <AppItem key={idx} idx={idx} active={idx === appIndex} appRoot={this} />)}
        </View>
      </MuiThemeProvider>
      <Typography type='display2' >{apps[appIndex].title}</Typography>
      <App />
    </View>
    const root2 = <TypographyTest />
    return <AppContainer key={appIndex} themeOptions={{ overridesX: apps[appIndex].overridesNew }}>
      {root2}
    </AppContainer>
  }
}

class AppItem extends React.PureComponent<{ idx: number; active: boolean; appRoot: AppRoot }> {
  render() {
    const { idx, active, appRoot } = this.props
    return <Button color='primary' disabled={active} onClick={() => appRoot.setState(state => ({ ...state, appIndex: idx }))}>{apps[idx].title}</Button>
  }
}

export default AppRoot
