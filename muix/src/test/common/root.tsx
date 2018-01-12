import React from 'react'

import Icons from './icons/index'
import Typography from './styles/typography'
import TextView from './primitives/text-view'
import Icon from './primitives/icon'
import ButtonTest from './components/button'
import Shadows from './shadows/index'
import ComponentX from './styles/component-x'
import ButtonDemo from './components/button-demo'

import { ScrollView, View, Text } from 'muix-primitives'
import { AppContainer } from 'muix-styles'
import Button from 'muix-components/Button/Button'

const apps: { title: string; app: React.ComponentType }[] = [
  { title: 'Button', app: ButtonTest },
  { title: 'Icons', app: Icons },
  { title: 'Typography', app: Typography },
  { title: 'TextView', app: TextView },
  { title: 'Icon', app: Icon },
  //{ title: 'Shadows', app: Shadows },
  { title: 'ComponentX', app: ComponentX },
  { title: 'ButtonDemo', app: ButtonDemo },
]

class AppRoot extends React.Component {
  state = { appIndex: 0, rtl: false, light: false }
  render() {
    const App = apps[this.state.appIndex].app
    return <AppContainer>
      <View>
        <View classes={{ root: { flexDirection: 'row', flexWrap: 'wrap' } }}>
          {apps.map((app, idx) => <AppItem idx={idx} active={idx === this.state.appIndex} />)}
        </View>
        <App />
      </View>
    </AppContainer>
  }
}

class AppItem extends React.PureComponent<{ idx: number; active: boolean }> {
  render() {
    const { idx, active } = this.props
    return <Button color='primary' disabled={active}>{apps[idx].title}</Button>
  }
}

//const app: React.SFC = () => <AppRoot />
export default AppRoot
