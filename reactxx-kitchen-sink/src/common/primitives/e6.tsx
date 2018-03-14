import * as React from 'react'

import { Text, View, ScrollView, LoremIpsum } from 'reactxx'

const App: React.SFC = props => {
  const text: ReactXX.TextRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', padding: 10, margin: 10, width: 300 }
  return <ScrollView horizontal>
    <Text className={text}>{LoremIpsum(40)}</Text>
    <Text className={text}>{LoremIpsum(40)}</Text>
    <Text className={text}>{LoremIpsum(40)}</Text>
    <Text className={text}>{LoremIpsum(40)}</Text>
  </ScrollView>
}

export default App

export const meta = {
  name: 'primitives/e6',
  title: 'Horizontal ScrollView',
  descr: '',
  Component: App
}
