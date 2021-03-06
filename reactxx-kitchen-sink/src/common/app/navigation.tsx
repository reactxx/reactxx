import React from 'react'
import ReactN from 'react-native'

import { LoremIpsum } from 'reactxx-basic'
import { GithubCircle } from 'reactxx-mdi/GithubCircle'
import { Types, View, Text, ScrollView, Icon } from 'reactxx'

import { H1, H2, H3, H4, H5, U, I, B, A, Blocquote, P } from '../primitives/typo'
import { examples, nameToExample, exampleToElement, components, navigationExample, KSink } from './index'
import { primitives } from '../basic/index'
import { component } from '../component/index'
import { mediaqs } from '../mediaq/index'
import { animations } from '../animation/index'
import { ResponsibleDrawer } from '../components/responsible-drawer/responsible-drawer'

export type GotoExample = (example: KSink.Example) => void
export type GetExampleUrl = (example: KSink.Example) => string

const gitHubUrlIdx = 7
const gitHubUrl = `https://github.com/reactxx/reactxx/tree/code-sandbox-${gitHubUrlIdx}/reactxx-kitchen-sink/src/common/`
const sandBoxUrl = `https://codesandbox.io/embed/github/reactxx/reactxx/tree/code-sandbox-${gitHubUrlIdx}/reactxx-kitchen-sink?codemirror=1&fontsize=12&` //view=preview&

const webGithubUrl: GetExampleUrl = (ex) => `${gitHubUrl}${ex.name}.tsx`
const webSandboxUrl: GetExampleUrl = (ex) => {
  const name = ex.name.replace('/', '%2F')
  return `${sandBoxUrl}module=%2Fsrc%2Fcommon%2F${name}.tsx&initialpath=${name}`
}

const debugPath = 'mediaq/me2'

class App extends React.Component<{}, KSink.Example> {

  locationExample = nameToExample(window && window.location && window.location.pathname ? window.location.pathname.substr(1) : null)

  state = nameToExample(debugPath)

  render() {
    if (this.locationExample.name !== 'app/navigation') return exampleToElement(this.locationExample)
    const content = this.state.name === 'app/navigation' ? (window.isWeb ? <HomeContentWeb /> : <HomeContentNative />) : exampleToElement(this.state)
    return <ResponsibleDrawer className={{ $native: { marginTop: 24 } }} drawer={<Drawer actName={this.state.name} gotoExample={this.gotoExample} />}>
      <Content actExample={this.state}>{content}</Content>
    </ResponsibleDrawer>
  }

  gotoExample: GotoExample = example => this.setState(example)
}

const drawerButton = { color: 'white', fontSize: 28, $web: { cursor: 'pointer' } } as Types.RulesetX
const toolbar = { flexDirection: 'row', alignItems: 'center', height: 48, padding: 15 } as Types.ViewRulesetX
const codeIcons = { color: 'white', marginLeft: 15, $web: { ':hover': { transform: 'scale(1.2)' } } } as Types.TextRulesetX
var logo = { flexGrow: 0, marginLeft: 5, color: 'lightblue', paddingRight: 10, marginRight: 10, borderRightColor: 'lightblue', borderRightWidth: 1, $web: { borderRightStyle: 'solid' } } as Types.RulesetX

const Drawer: React.SFC<{ gotoExample: GotoExample; actName: string }> = ({ children, gotoExample, actName }) => <View className={{ flex: 1 }}>
  <View className={{ ...toolbar, backgroundColor: 'gray' }}>
    <Text className={{ flexGrow: 1 }}>{' '}</Text>
    <ResponsibleDrawer.LayoutChanged>
      {({ style, onPress, iconData }) => <Icon className={{ ...drawerButton, ...style }} onPress={onPress} data={iconData} />}
    </ResponsibleDrawer.LayoutChanged>
  </View>
  <ScrollView classes={{ container: { backgroundColor: 'lightgray', paddingTop: 15, flexGrow: 1 } }}>
    <DrawerItem key={navigationExample.name} example={navigationExample} gotoExample={gotoExample} actName={actName} />
    {DrawerGroup('Primitives', primitives, gotoExample, actName)}
    {DrawerGroup('Component', component, gotoExample, actName)}
    {DrawerGroup('Media Queries', mediaqs, gotoExample, actName)}
    {DrawerGroup('Animation', animations, gotoExample, actName)}
    {DrawerGroup('Components', components, gotoExample, actName)}
  </ScrollView>
</View>

const Content: React.SFC<{ actExample: KSink.Example }> = ({ children, actExample }) => <View className={{ flex: 1 }}> {/* content */}
  <View className={{ ...toolbar, backgroundColor: 'blue' }}>
    <ResponsibleDrawer.LayoutChanged>
      {({ style, onPress, iconData }) => <Icon className={{ ...drawerButton, ...style }} onPress={onPress} data={iconData} />}
    </ResponsibleDrawer.LayoutChanged>
    <Text className={logo}>ReactXX KitchenSink</Text>
    <Text numberOfLines={1} className={{ flexGrow: 1, flexShrink: 1, color: 'white', }}>{actExample.title}</Text>
    {window.isWeb && actExample.name != 'xapp/navigation' && <Icon className={{ ...codeIcons, fontSize: 32 }} $web={{ viewBox: '0 0 1024 1024' }} url={webSandboxUrl(actExample)} >{codeSandboxSVG}</Icon>}
    {window.isWeb && <Icon data={GithubCircle} className={codeIcons} url={webGithubUrl(actExample)} />}
  </View>
  <View className={{ flexGrow: 1, backgroundColor: 'white', padding: 15 }}>
    {children}
  </View >
</View >

const HomeContentWeb: React.SFC = () => <ScrollView classes={{ container: { paddingTop: 15, flexGrow: 1 } }}>

  <P>{LoremIpsum(160)}</P>
  <A url='https://expo.io/@pzika/reactxx-kitchen-sink'>{LoremIpsum(160)}</A>
  <P>{LoremIpsum(160)}</P>
</ScrollView>

const HomeContentNative: React.SFC = () => <ScrollView classes={{ container: { paddingTop: 15, flexGrow: 1 } }}>
  <P>{LoremIpsum(160)}</P>
  <A url='https://reactxx.github.io/reactxx/'>{LoremIpsum(10)}</A>
  <P>{LoremIpsum(160)}</P>
</ScrollView>

const DrawerGroup = (title: string, items: KSink.Example[], gotoExample: GotoExample, actName: string) => <View className={{ padding: 15 }}>
  <Text className={{ color: 'gray', fontSize: 18, marginBottom: 15 }}>{title}</Text>
  {items.map(ex => <DrawerItem key={ex.name} example={ex} gotoExample={gotoExample} actName={actName} />)}
</View>

const DrawerItem: React.SFC<{ example: KSink.Example, gotoExample: GotoExample, actName: string }> = ({ example, gotoExample, actName }) => {
  const isActive = actName === example.name
  return <Text onPress={isActive ? null : () => gotoExample(example)} className={{ marginBottom: 15, paddingLeft: 15, ...(isActive ? { fontWeight: 'bold' } : { color: 'blue' }) }} >
    {example.title}
  </Text>
}

const codeSandboxSVG = [
  <g key={1} id='Layer_1'>
    <polyline fill='currentColor' points='719.001,851 719.001,639.848 902,533.802 902,745.267 719.001,851' />
    <polyline fill='currentColor' points='302.082,643.438 122.167,539.135 122.167,747.741 302.082,852.573 302.082,643.438' />
    <polyline fill='currentColor' points='511.982,275.795 694.939,169.633 512.06,63 328.436,169.987 511.982,275.795' />
  </g>,
  <g key={2} id='Layer_2'>
    <polyline fill='none' stroke='currentColor' strokeWidth='80' strokeMiterlimit='10' points='899,287.833 509,513 509,963' />
    <line fill='none' stroke='currentColor' strokeWidth='80' strokeMiterlimit='10' x1='122.167' y1='289' x2='511.5' y2='513' />
    <polygon fill='none' stroke='currentColor' strokeWidth='80' strokeMiterlimit='10' points='121,739.083 510.917,963.042 901,738.333 901,288 511,62 121,289' />
  </g>
]

export default App



