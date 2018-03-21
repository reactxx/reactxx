import React from 'react'

import { Text, View, ScrollView } from 'reactxx-basic/index'
import { TBasic } from 'reactxx-basic/typings'
import { LoremIpsum } from 'reactxx-basic/develop'


const App: React.SFC = props => {
  const text: TBasic.TextRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', padding: 10, margin: 10, width: 300 }
  return <ScrollView horizontal>
    <Text className={text}>{LoremIpsum(40)}</Text>
    <Text className={text}>{LoremIpsum(40)}</Text>
    <Text className={text}>{LoremIpsum(40)}</Text>
    <Text className={text}>{LoremIpsum(40)}</Text>
  </ScrollView>
}

export default App

