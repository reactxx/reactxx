import React from 'react'

import { TBasic, Text, View, ScrollView } from 'reactxx'
import { LoremIpsum } from 'reactxx-basic2'

const App: React.SFC = props => {
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

export default App
