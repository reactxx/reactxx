import React from 'react'

import { Text } from 'reactxx'

const App: React.SFC = props => <Text className={{ fontWeight: 'bold', fontSize: 1 }} style={{ fontSize: 64 }}>
  HALLO WORLD!
</Text>

export default App

export const meta: KSink.Example = {
  name: 'primitives/e1',
  title: 'HALLO WORLD with className and style',
  descr: '',
  Component: App
}
