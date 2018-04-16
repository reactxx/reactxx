import React from 'react'
import { TTheme, CompNames, Text, View, ScrollView, Icon, AppContainer, } from 'reactxx'
import { LoremIpsum } from 'reactxx-basic'

import { TBasic } from 'reactxx-basic'

const XX: React.CSSProperties = {}

interface Example {
  title: string
  descr?: string
  Component: React.ComponentType
}

const primitives: { [id: string]: Example } = {
  //********* E01
  $01: {
    title: 'HALLO WORLD with className and style',
    descr: `
- "className" has lower priority then "style" 
- for web: "className" is converted to atomic classes with @FELA
`,
    Component: props => <Text className={{ fontWeight: 'bold', fontSize: 1 }} style={{ fontSize: 64 }}>
      HALLO WORLD!
  </Text>
  },

  $02: {
    title: 'Platform specific rules',
    descr: `
For "Text" element:
- valid "className" and "style" rules: see ReactXX.TextStyle
- valid "$web" rules: see @FELA
- valid "$native" rules: see react-native TextStyle
`,
    Component: props => <Text className={{ fontSize: 64, $native: { fontSize: 32 }, $web: { ':hover': { textDecoration: 'underline' } } }}>
      HALLO WORLD!
  </Text>
  },

  $03: {
    title: 'Inner Text is inline element',
    descr: `
`,
    Component: props => <>
      <Text className={{ fontWeight: 'bold', fontSize: 32 }}> {/*BLOCK*/}
        HALLO WORLD!
      </Text>
      <Text> {/*BLOCK*/}
        {LoremIpsum(10)}{' '}
        <Text onPress={() => alert(LoremIpsum(5))} className={{ color: 'blue', $web: { ':hover': { textDecoration: 'underline' } } }} > {/*INLINE*/}
          {LoremIpsum(5)}
        </Text>{' '}
        {LoremIpsum(10)}
      </Text>
    </>
  },

  $04: {
    title: 'Layout with Flex',
    descr: `
See https://facebook.github.io/react-native/docs/flexbox.html
For "View" element:
- valid "className" and "style" rules: see ReactXX.TextStyle
- valid "$native" rules: see react-native ViewStyle
`,
    Component: props => {
      const border: TBasic.ViewRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', marginBottom: 20 }
      return <View className={{ padding: 10 }}>
        <View className={border}>
          <Text className={{ backgroundColor: 'lightgreen', alignSelf: 'flex-start' }}>
            HALLO WORLD!
          </Text>
          <View className={{ width: 60, height: 40, backgroundColor: 'lightblue', alignSelf: 'flex-end' }} />
          <View className={{ width: 60, height: 80, backgroundColor: 'lightgray', alignSelf: 'center' }} />
        </View>
        <View className={{ ...border, flexDirection: 'row' }}>
          <Text className={{ backgroundColor: 'lightgreen', alignSelf: 'flex-start' }}>
            HALLO <Text style={{ color: 'red' }}>WORLD!</Text>
          </Text>
          <View className={{ width: 60, height: 40, backgroundColor: 'lightblue', alignSelf: 'flex-end' }} />
          <View className={{ width: 60, height: 80, backgroundColor: 'lightgray', alignSelf: 'center' }} />
        </View>
      </View>
    }
  },

  $05: {
    title: 'Vertical ScrollView',
    descr: `
`,
    Component: props => {
      const border: TBasic.ViewRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', padding: 10 }
      return <ScrollView classes={{ container: { padding: 10 } }}>
        <View className={border}>
          <Text className={{ marginTop: 10 }}>
            {LoremIpsum(160)}
          </Text>
          <Text className={{ marginTop: 10 }}>
            {LoremIpsum(160)}
          </Text>
        </View>
        <Text className={{ ...border, marginLeft: 40, marginTop: 10 }}>
          {LoremIpsum(160)}
        </Text>
      </ScrollView>
    }
  },

  $06: {
    title: 'Horizontal ScrollView',
    descr: `
`,
    Component: props => {
      const text: TBasic.TextRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', padding: 10, margin: 10, width: 300 }
      return <ScrollView horizontal>
        <Text className={text}>111 {LoremIpsum(40)}</Text>
        <Text className={text}>222 {LoremIpsum(40)}</Text>
        <Text className={text}>333 {LoremIpsum(40)}</Text>
        <Text className={text}>444 {LoremIpsum(40)}</Text>
      </ScrollView>
    }
  },

  $07: {
    title: 'Media',
    descr: `
`,
    Component: props => {
      const text: TBasic.TextRulesetX = {
        $mediaq: {
          '-480': { color: 'red', },
          '480-1024': { color: 'green', },
          '1024-': { color: 'blue', },
        }
      }
      return <>
        <Text classes={{ root: text }}>{LoremIpsum(40)}</Text>
      </>
    }
  },

}

const TestApp: React.SFC = props => <AppContainer>
  <Text className={theme => ({ color: 'red', fontWeight: 'bold', textDecoration: 'underline' })}>
    red, bold, underline
  </Text>
  <Text onPress={() => alert('blue click')} style={theme => ({ color: 'blue', fontWeight: 'normal', textDecoration: 'underline' })} >
    blue, underline, on new line, pointer cursor (is clickable)
  </Text>
</AppContainer>

const AppThemeOverride: React.SFC = props => <AppContainer>
  <Text className={theme => ({ color: 'red', fontWeight: 'bold', textDecoration: 'underline' })}>
    red, bold, underline
  </Text>
  <Text onPress={() => alert('blue click')} style={theme => ({ color: 'blue', fontWeight: 'normal', textDecoration: 'underline' })} >
    blue, underline, on new line, pointer cursor (is clickable)
  </Text>
</AppContainer>

const App = primitives.$07.Component
export default App

const E01$01_: Example = {
  title: '',
  Component: props => null
}


let t: TTheme.ThemeState

t[CompNames.ScrollView].sheet.container
