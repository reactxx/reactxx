import React from 'react'

import { Text, LoremIpsum } from 'reactxx'

const App: React.SFC = props => <>
  <Text className={{ fontWeight: 'bold', fontSize: 32 }}> {/*BLOCK*/}
    HALLO WORLD!
  </Text>
  <Text> {/*BLOCK*/}
    {LoremIpsum(10)}{' '}
    <Text onPress={() => alert(LoremIpsum(5))} className={{ color: 'blue', $web: { ':hover': { textDecoration: 'underline' } } }} > {/*INLINE*/}
      {LoremIpsum(5)}
    </Text>{' '}
    {LoremIpsum(10)}
  </Text>
</>

export default App

export const meta: KSink.Example = {
  name: 'primitives/e3',
  title: 'Inner Text is inline element',
  descr: '',
  Component: App
}
