import * as React from 'react'

import { View, Text, ScrollView, Icon } from 'reactxx'
import { examples, nameToExample, exampleToElement, primitives, components, navigationExample, KSink } from './index'
import { ResponsibleDrawer } from '../responsible-drawer/responsible-drawer'
import { GithubCircle } from 'reactxx-mdi/GithubCircle'

export type GotoExample = (example: KSink.Example) => void 

const webGithubUrl = (ex: KSink.Example) => `https://github.com/reactxx/reactxx/blob/master/reactxx-kitchen-sink/src/common/${ex.name}.tsx`
const webSandboxUrl = (ex: KSink.Example) => `https://codesandbox.io/s/github/reactxx/reactxx/tree/code-sandbox/reactxx-kitchen-sink?codemirror=1&fontsize=12&view=preview&module=%2Fsrc%2Fcommon%2F${ex.name.replace('/', '%2F')}.tsx`


class App extends React.Component<{}, KSink.Example> {

  state = nameToExample((window && window.location ? window.location.pathname : null) as string);

  render() {
    const content = this.state.name === 'app/navigation' ? <HomeContent /> : exampleToElement(this.state)
    return <ResponsibleDrawer className={{ $native: { marginTop: 24 } }} drawer={<Drawer actName={this.state.name} gotoExample={this.gotoExample} />}>
      <Content actExample={this.state}>{content}</Content>
    </ResponsibleDrawer>
  }

  gotoExample: GotoExample = (example => this.setState(example)).bind(this);
}

const drawerButton = { color: 'white', fontSize: 28, $web: { cursor: 'pointer' } } as ReactXX.RulesetX
const toolbar = { flexDirection: 'row', alignItems: 'center', height: 48, padding: 15 } as ReactXX.RulesetX<ReactN.ViewStyle>
const codeIcons = { color: 'white', marginLeft: 15, $web: { ':hover': { transform: 'scale(1.2)' } } } as ReactXX.RulesetX

const Drawer: React.SFC<{ gotoExample: GotoExample; actName: string }> = ({ children, gotoExample, actName }) => <View className={{ flex: 1 }}>
  <View className={{ ...toolbar, backgroundColor: 'gray' }}>
    <Text className={{ flexGrow: 1 }}>{' '}</Text>
    <ResponsibleDrawer.LayoutChanged render={({ style, onPress, iconData }) => <Icon className={{ ...drawerButton, ...style }} onPress={onPress} data={iconData} />} />
  </View>
  <ScrollView classes={{ container: { backgroundColor: 'lightgray', paddingTop: 15, flexGrow:1 } }}>
    <DrawerItem key={navigationExample.name} example={navigationExample} gotoExample={gotoExample} actName={actName} />
    {DrawerGroup('Primitives', primitives, gotoExample, actName)}
    {DrawerGroup('Components', components, gotoExample, actName)}
  </ScrollView>
</View>

const Content: React.SFC<{ actExample: KSink.Example }> = ({ children, actExample }) => <View className={{ flex: 1 }}> {/* content */}
  <View className={{ ...toolbar, backgroundColor: 'blue' }}>
    <ResponsibleDrawer.LayoutChanged render={({ style, onPress, iconData }) => <Icon className={{ ...drawerButton, ...style }} onPress={onPress} data={iconData} />} />
    <Text className={{ fontWeight: 'bold', color: 'white', marginLeft: 15, }}>ReactXX</Text>
    <Text numberOfLines={1} className={{ flexGrow: 1, marginLeft: 15, color: 'lightgray' }}>Framework which enables creation of visual components for both react and react-native</Text>
    {window.isWeb && actExample.name != 'app/navigation' && <Icon className={{ ...codeIcons, fontSize: 32 }} $web={{ viewBox: '0 0 1024 1024', url: webSandboxUrl(actExample) }} >{codeSandboxSVG}</Icon>}
    {window.isWeb && <Icon data={GithubCircle} className={codeIcons} $web={{ url: webGithubUrl(actExample) }} />}
  </View>
  <View className={{ flexGrow: 1, backgroundColor: 'white', padding: 15 }}>
    {children}
  </View >
</View>

const HomeContent: React.SFC = () => <View className={{ flex: 1, }}>
  <Text>Hallo world</Text>
</View>

const DrawerGroup = (title: string, items: KSink.Example[], gotoExample: GotoExample, actName: string) => <View className={{ padding: 15 }}>
  <Text className={{ color: 'gray', fontSize: 18, marginBottom: 15 }}>{title}</Text>
  {items.map(ex => ex.ignoreInNavigation ? null : <DrawerItem key={ex.name} example={ex} gotoExample={gotoExample} actName={actName} />)}
</View>

//const DrawerContent = (gotoExample: GotoExample, actName: string) => <View className={{ flex: 1 }}>
//</View>

const DrawerItem: React.SFC<{ example: KSink.Example, gotoExample: GotoExample, actName: string }> = ({ example, gotoExample, actName }) => {
  const isActive = actName === example.name
  return <Text onPress={isActive ? null : () => gotoExample(example)} className={{ marginBottom: 15, paddingLeft: 15, ...(isActive ? { fontWeight: 'bold' } : { color: 'blue' }) }} >
    {example.title}
  </Text>
}

const codeSandboxSVG = [
  <g id='Layer_1'>
    <polyline fill='currentColor' points='719.001,851 719.001,639.848 902,533.802 902,745.267 719.001,851' />
    <polyline fill='currentColor' points='302.082,643.438 122.167,539.135 122.167,747.741 302.082,852.573 302.082,643.438' />
    <polyline fill='currentColor' points='511.982,275.795 694.939,169.633 512.06,63 328.436,169.987 511.982,275.795' />
  </g>,
  <g id='Layer_2'>
    <polyline fill='none' stroke='currentColor' stroke-width='80' stroke-miterlimit='10' points='899,287.833 509,513 509,963' />
    <line fill='none' stroke='currentColor' stroke-width='80' stroke-miterlimit='10' x1='122.167' y1='289' x2='511.5' y2='513' />
    <polygon fill='none' stroke='currentColor' stroke-width='80' stroke-miterlimit='10' points='121,739.083 510.917,963.042 901,738.333 901,288 511,62 121,289' />
  </g>
]

export default App

export const meta = {
  name: 'app/navigation',
  title: 'Home',
  descr: '',
  Component: App,
};
