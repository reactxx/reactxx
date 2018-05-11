import React from 'react'

import { Text } from 'reactxx-primitives'
import { LoremIpsum } from 'reactxx-basic'

import { Types } from 'reactxx'

const App: React.SFC = props => {
  const changeColorRuleset: Types.TextRulesetX = {
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

