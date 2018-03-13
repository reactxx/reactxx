import React from 'react'

import { Text, LoremIpsum } from 'reactxx'

const App: React.SFC = props => {
  const text: ReactXX.TextRulesetX = {
    $mediaq: {
      '-480': { color: 'red', },
      '480-1024': { color: 'green', },
      '1024-': { color: 'blue', },
    }
  }
  return <Text classes={{ root: text }}>{LoremIpsum(40)}</Text>
}

export default App

export const meta: KSink.Example = {
  name: 'primitives/e7',
  title: 'Media query',
  descr: '',
  Component: App
}
