import React from 'react'

import { Text } from 'reactxx-primitives'

const App: React.SFC = props => <Text
  className={{
    fontSize: 64,
    $native: {
      fontSize: 18
    },
    $web: {
      ':hover': {
        textDecoration: 'underline',
        color: 'lightgray'
      }
    }
  }}>
  HALLO WORLD!
</Text>

export default App

