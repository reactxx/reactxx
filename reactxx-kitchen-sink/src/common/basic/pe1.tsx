import React from 'react'

import { Text } from 'reactxx-primitives'

const App: React.SFC = props => <Text
  className={{
    fontWeight: 'bold',
    fontSize: 1
  }}
  style={{
    fontSize: 64
  }}>
  HALLO WORLD!
</Text>

export default App

