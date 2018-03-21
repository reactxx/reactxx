import React from 'react'

import { TSheets } from 'reactxx-typings'
import { Text, } from 'reactxx'
import { LoremIpsum } from 'reactxx-basic/develop'

const App: React.SFC = props => {
  const changeColorRuleset: TSheets.TextRulesetX = {
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

