import * as React from 'react'

import { Text, View, ScrollView, LoremIpsum } from 'reactxx'

const App: React.SFC = props => {
  const border: ReactXX.ViewRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', padding: 10 }
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

export default App

export const meta: KSink.Example = {
  name: 'primitives/e5',
  title: 'Vertical ScrollView',
  descr: '',
  Component: App
}
