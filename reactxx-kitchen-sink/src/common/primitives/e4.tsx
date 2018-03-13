import React from 'react'

import { Text, View, LoremIpsum } from 'reactxx'

const App: React.SFC = props => {
  const border: ReactXX.ViewRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', marginBottom: 20 }
  return <View className={{ padding: 10 }}>
    <View className={{ ...border, justifyContent: 'center', alignItems:'center' }}>
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

export default App

export const meta: KSink.Example = {
  name: 'primitives/e4',
  title: 'Layout with Flex',
  descr: '',
  Component: App
}
