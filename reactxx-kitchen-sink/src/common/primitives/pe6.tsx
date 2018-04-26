import React from 'react'

import { TBasic, Text, View, ScrollView } from 'reactxx'
import { LoremIpsum } from 'reactxx-basic'


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

