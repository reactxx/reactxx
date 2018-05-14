import React from 'react'

import { text, textSheet, TComps, CompNames } from 'reactxx-primitives'
import { LoremIpsum } from 'reactxx-basic'
import { MediaQ_AppContainer } from 'reactxx-mediaq'

import { Types } from './types'
import { withStylesCreator } from './withStyles'

const App: React.SFC = props => {
  const changeColorRuleset: Types.TextRulesetX = {
    $mediaq: {
      '-480': { color: 'red', fontSize: 14 },
      '480-1024': { color: 'green', fontStyle: 'italic' },
      '1024-': { color: 'blue', },
    },
    fontSize: 20,
  }
  return <MediaQ_AppContainer>
    <Text className={changeColorRuleset} developer_flag>{LoremIpsum(40)}</Text>
  </MediaQ_AppContainer>
}

export default App

// Define Text component with MediaQ support
const Text: Types.ComponentTypeX<TComps.TextShape> = withStylesCreator(CompNames.Text, textSheet, text as Types.CodeComponentType<TComps.TextShape>)()