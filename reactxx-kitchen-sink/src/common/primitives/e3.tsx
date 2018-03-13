import React from 'react'

import { Text, LoremIpsum } from 'reactxx'

const App: React.SFC = props => <>
  <Text className={{ fontWeight: 'bold', fontSize: 32, marginBottom: 15 }}>
    HALLO WORLD!
  </Text>
  <Text>
    {LoremIpsum(10)}{' '}
    <Text onPress={() => alert(LoremIpsum(5))} className={{ color: 'blue', $web: { ':hover': { textDecoration: 'underline' } } }} >
      {LoremIpsum(5)}
    </Text>
    {' '}{LoremIpsum(10)}
  </Text>
</>

export default App

export const meta: KSink.Example = {
  name: 'primitives/e3',
  title: 'Inner Text is inline element',
  descr: '',
  Component: App
}
