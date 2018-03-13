import * as React from 'react'

import { View, Text, ScrollView, Icon } from 'reactxx'
import { examples, nameToExample, exampleToElement } from './index'
import { ResponsibleDrawer } from '../responsible-drawer/responsible-drawer'

class App extends React.Component<{}, KSink.Example> {

  state: KSink.Example = nameToExample((window && window.location ? window.location.pathname : null) as string);

  render() {
    const content = this.state.name === KSink.Consts.navigationName ? <HomeContent /> : exampleToElement(this.state)
    return <ResponsibleDrawer className={{ $native: { marginTop: 24 } }} drawer={<Drawer>{DrawerContent(this.gotoExample, this.state.name)}</Drawer>}>
      <Content>{content}</Content>
    </ResponsibleDrawer>
  }

  gotoExample: GotoExample = (example => this.setState(example)).bind(this);

}

type GotoExample = (example: KSink.Example) => void

const button = { color: 'white', fontSize: 28, $web: { cursor: 'pointer' } } as ReactXX.RulesetX

const Drawer: React.SFC = ({ children }) => <ScrollView classes={{ container: { flex: 1, backgroundColor: 'lightgray' } }}>
  <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, padding: 10, backgroundColor: 'gray', }}>
    <Text className={{ flexGrow: 1 }}>{' '}</Text>
    <ResponsibleDrawer.LayoutChanged render={({ style, onPress, iconData }) => <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />} />
  </View>
  {children}
</ScrollView>

const Content: React.SFC = ({ children }) => <ScrollView classes={{ container: { flex: 1 } }}> {/* content */}
  <View className={{ flexDirection: 'row', alignItems: 'center', height: 48, backgroundColor: 'blue', padding: 10 }}>
    <ResponsibleDrawer.LayoutChanged render={({ style, onPress, iconData }) => <Icon className={{ ...button, ...style }} onPress={onPress} data={iconData} />} />
  </View>
  {children}
</ScrollView>

const HomeContent: React.SFC = () => <View>
  <Text>Hallo world</Text>
</View>

const DrawerContent = (gotoExample: GotoExample, actName: string) => examples.map(ex => ex.ignoreInNavigation ? null : <DrawerItem key={ex.name} example={ex} gotoExample={gotoExample} actName={actName} />)

const DrawerItem: React.SFC<{ example: KSink.Example, gotoExample: GotoExample, actName: string }> = ({ example, gotoExample, actName }) => {
  const isActive = actName === example.name
  return <Text onPress={isActive ? null : () => gotoExample(example)} >
    {example.title}
  </Text>
}

export default App

export const meta: KSink.Example = {
  name: KSink.Consts.navigationName,
  title: 'Home',
  descr: '',
  Component: App,
}
