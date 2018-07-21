import React from 'react'

import { text, textSheet, TComps, CompNames } from 'reactxx-primitives'
import { LoremIpsum } from 'reactxx-basic'
import { MediaQ_AppContainer, Types, withStylesCreator } from 'reactxx-mediaq'

export const enum Consts {
  Text = 'ks$me1$text' //unique component name
}

const App: React.SFC = props => {
  const changeColorRuleset: Types.TextRulesetX = {
    $mediaq: {
      '-480': { color: 'red', fontSize: 14 },
      '480-1024': { color: 'green', fontStyle: 'italic', $web: { ':hover': { color: 'lightgreen' } } },
      '1024-': { color: 'blue', },
    },
    fontSize: 20,
    margin: 10,
  }
  return <MediaQ_AppContainer>
    <Text className={changeColorRuleset}>{LoremIpsum(40)}</Text>
  </MediaQ_AppContainer>
}

export default App

//Create Define Text component with MediaQ support
const Text: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(textSheet, text as Types.CodeComponentType<TComps.TextShape>, {name:Consts.Text})()