import React from 'react'

import { Text, View, LoremIpsum } from 'reactxx'

const App: React.SFC = props => {
  const bars: ReactXX.ViewRulesetX = { flexGrow: 0, justifyContent: 'center', alignItems: 'center', height: 48, }
  return <>
    <View className={{ ...bars, backgroundColor: 'lightgreen' }}>
      <Text className={{ fontSize: 32 }} numberOfLines={1}>
        HALLO WORLD!
      </Text>
    </View>
    <View className={{ flexDirection: 'row', flexGrow: 1 }}>
      <View className={{ width: 200, backgroundColor: 'lightblue', flexGrow: 0, padding: 20 }}>
      </View>
      <View className={{ flexShrink: 1, padding: 20, backgroundColor:'f7f7f7' }}>
        <Text>{LoremIpsum(80)}</Text>
      </View>
    </View>
    <View className={{ ...bars, backgroundColor: 'lightgray' }}>
      <Text numberOfLines={1}>{LoremIpsum(10)}</Text>
    </View>
  </>
}

export default App

export const meta: KSink.Example = {
  name: 'primitives/e4',
  title: 'Layout with Flex',
  descr: '',
  Component: App
}
//justifyContent: 'center', alignItems: 'center' 