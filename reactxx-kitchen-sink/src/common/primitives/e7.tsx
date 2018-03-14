import React from 'react'

import { Text, LoremIpsum } from 'reactxx'

const App: React.SFC = props => {
  const changeColorRuleset: ReactXX.TextRulesetX = {
    $mediaq: {
      '-480': { color: 'red', fontSize: 14 },
      '480-1024': { color: 'green', },
      '1024-': { color: 'blue', },
    },
    fontSize: 20,
  }
  return <Text className={changeColorRuleset}>{LoremIpsum(40)}</Text>
}

export default App

export const meta: KSink.Example = {
  name: 'primitives/e7',
  title: 'Media query',
  descr: '',
  Component: App
}
