import React from 'react'
import { Text, View, ScrollView, Icon, AppContainer, LoremIpsum } from 'reactxx'

interface Example {
  title: string
  descr?: string
  Component: React.ComponentType
}

//********* E01
const E01$01: Example = {
  title: 'HALLO WORLD with className and style',
  descr: '',
  Component: props => <Text className={{ fontWeight: 'bold', fontSize: 1 }} style={{ fontSize: 64 }}>
    HALLO WORLD!
  </Text>
}

const E01$02: Example = {
  title: 'Platform specific rules',
  Component: props => <Text className={{ fontSize: 64, $native: { fontSize: 32 }, $web: { ':hover': { textDecoration: 'underline' } } }}>
    HALLO WORLD!
  </Text>
}

const E01$03: Example = {
  title: 'Inner Text is inline element',
  Component: props => <>
    <Text className={{ fontWeight: 'bold', fontSize: 32 }}>
      HALLO WORLD!
    </Text>
    <Text>
      {LoremIpsum(10)}{' '}
      <Text onPress={() => alert(LoremIpsum(5))} className={{ color: 'blue', $web: { ':hover': { textDecoration: 'underline' } } }} >{LoremIpsum(5)}</Text>{' '}
      {LoremIpsum(10)}
    </Text>
  </>
}

const E01$04: Example = {
  title: 'Layout with Flex',
  Component: props => {
    const border: ReactXX.ViewRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', marginBottom: 20 }
    return <View className={{padding: 10}}>
      <View className={border}>
        <Text className={{ backgroundColor: 'lightgreen', alignSelf: 'flex-start' }}>
          HALLO WORLD!
        </Text>
        <View className={{ width: 60, height: 40, backgroundColor: 'lightblue', alignSelf: 'flex-end' }} />
        <View className={{ width: 60, height: 80, backgroundColor: 'lightgray', alignSelf: 'center' }} />
      </View>
      <View className={{...border, flexDirection: 'row' }}>
        <Text className={{ backgroundColor: 'lightgreen', alignSelf: 'flex-start' }}>
          HALLO <Text style={{color: 'red'}}>WORLD!</Text>
        </Text>
        <View className={{ width: 60, height: 40, backgroundColor: 'lightblue', alignSelf: 'flex-end' }} />
        <View className={{ width: 60, height: 80, backgroundColor: 'lightgray', alignSelf: 'center' }} />
      </View>
    </View>
  }
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

const App = E01$04.Component
export default App

const E01$01_: Example = {
  title: '',
  Component: props => null
}
