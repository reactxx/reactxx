import React from 'react'

import { Text, View, ScrollView } from 'reactxx-basic/index'
import { TBasic } from 'reactxx-basic/typings'
import { LoremIpsum } from 'reactxx-basic/develop'

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
