import * as React from 'react'

import { Text } from 'reactxx'

const App: React.SFC = props => <Text className={{ fontSize: 64, $native: { fontSize: 18 }, $web: { ':hover': { textDecoration: 'underline', color: 'lightgray' } } }}>
  HALLO WORLD!
</Text>

export default App

export const meta: KSink.Example = {
  name: 'primitives/e2',
  title: 'Platform specific rules',
  descr: '',
  Component: App
}
