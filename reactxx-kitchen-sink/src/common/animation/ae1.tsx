import React from 'react'

import { Text, View, ScrollView } from 'reactxx-primitives'
import { LoremIpsum } from 'reactxx-basic'
import { Types, withStylesCreator } from 'reactxx-animation'

export const enum Consts {
  Text = 'ks$ae1$text' //unique component name
}

const App: React.SFC = props => {
  const changeColorRuleset: Types.TextRulesetX = {
    fontSize: 20,
    margin: 10,
  }
  return <Text className={changeColorRuleset} developer_flag>{LoremIpsum(40)}</Text>
}

export default App

