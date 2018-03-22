import React from 'react'

import { LoremIpsum, TBasic } from 'reactxx-basic'

import { Text, } from 'reactxx'

const App: React.SFC = props => {
  const changeColorRuleset: TBasic.TextRulesetX = {
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

