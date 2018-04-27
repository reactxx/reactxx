import React from 'react'
import ReactN from 'react-native'
import ReactDOM from 'react-dom'

import { TTheme, TComps, TBasic, TAddInConfig, Text, View, ScrollView, Icon, AppContainer } from 'reactxx'
import { withStylesCreator, ThemeProvider } from '../../reactxx/common/withStyles'
import { TMediaQ } from 'reactxx-mediaq'

/************************
* TYPINGS
*************************/

export const enum Consts {
  Label = 'comp$withstyle2' //unique component name
}

// 
export type Shape = TBasic.OverwriteShape<{
  common: TComps.ShapeTexts<'root'>,
  style: 'Text'
  mediaq: 'small'
  props: {
  },
  variant: Variant,
  nameType: Consts.Label
}>

/************************
* SHEET
*************************/
export interface Variant extends TMediaQ.CodeProps<TBasic.getMediaQ<Shape>> { }

const sheet: TTheme.SheetCreatorX<Shape> = (theme, variant) => ({
  root: {
    $mediaq: {
      '-480': { color: 'red' },
      '480-1024': { color: 'blue' },
      '1024-': { color: 'green' },
    },
    fontSize: variant.mediaqCode.small ? 24 : 48
  }
})

/************************
* CODE
*************************/
const label: TBasic.CodeSFC<Shape> = ({ classes, mergeRulesetWithOverrides, children, style }) => {
  const root = mergeRulesetWithOverrides(classes.root) as TBasic.ViewRulesetX
  return <Text className={root}>{children}</Text>
}

/************************
* EXPORTED COMPONENT
*************************/
export const LabelCreator = withStylesCreator<Shape>(Consts.Label, sheet, label, {
  getVariant: ({ mediaqCode }) => ({ mediaqCode }),
  variantToString: ({ mediaqCode }) => mediaqCode.small.toString(),
  defaultProps: {
    $mediaq: {
      small: [0, 800]
    }
  }
})

export const Label = LabelCreator(null)
export const LabelC = LabelCreator({ withCascading: true })


/************************************************
*************************************************
*
* EXAMPLE
*
*************************************************
*************************************************/

const App: React.SFC = props => <AppContainer>
  <View CONSTANT>
    <Label>Label 1</Label>
    <LabelC.Provider className={{ fontStyle: 'italic' }}>
      <LabelC>Label 2</LabelC>
      <Label>Label 3</Label>
    </LabelC.Provider>
  </View>
</AppContainer>

export default App

