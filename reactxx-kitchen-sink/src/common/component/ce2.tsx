import React from 'react'
import ReactN from 'react-native'

import { Types } from 'reactxx-basic'
import { TTheme, ScrollView } from 'reactxx'
//import { TComps, TTheme, TBasic, TAddInConfig, Text, View, ScrollView, Icon, withStylesCreator } from 'reactxx'

/************************
* TYPINGS
*************************/

export type TypographyKeys = 'h1' | 'h2' | 'h3' | 'h4'

export interface Theme extends TTheme.ThemeX {
  typo: { [P in TypographyKeys]: Types.RulesetCommon<'Text'> },
  mediaQBreakpoints: {
    mobileEnd: 480, // 1px - 479px is mobile
    tabletEnd: 1024, // 480px - 1024px is tablet
    // else desktop
  }

}

const App: React.SFC = props => <ScrollView className={{ flex: 1 }}>
</ScrollView>

export default App