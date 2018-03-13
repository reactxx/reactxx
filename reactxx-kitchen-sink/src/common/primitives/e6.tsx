import React from 'react'

import { Text, View, ScrollView, LoremIpsum } from 'reactxx'

const App: React.SFC = props => {
  const text: ReactXX.TextRulesetX = { borderColor: 'maroon', borderWidth: 1, borderStyle: 'solid', padding: 10, margin: 10, width: 300 }
  return <ScrollView horizontal>
    <Text className={text}>111 {LoremIpsum(40)}</Text>
    <Text className={text}>222 {LoremIpsum(40)}</Text>
    <Text className={text}>333 {LoremIpsum(40)}</Text>
    <Text className={text}>444 {LoremIpsum(40)}</Text>
  </ScrollView>
}

export default App

export const meta: KSink.Example = {
  name: 'primitives/e6',
  title: 'Horizontal ScrollView',
  descr: '',
  Component: App
}
