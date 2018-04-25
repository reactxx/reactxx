import React from 'react'
import ReactN from 'react-native'
import ReactDOM from 'react-dom'

import { TTheme, TComps, TBasic, TAddInConfig, Text, View, ScrollView, Icon, AppContainer } from 'reactxx'
import { withStyles, ThemeProvider } from '../../reactxx/common/withStyles'
import * as MediaQ from 'reactxx-mediaq'

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
export interface Variant extends MediaQ.CodeProps<TBasic.getMediaQ<Shape>> { }

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
export const LabelCreator = (overrideOptions: TTheme.WithStyleOptions_Component<Shape>) => withStyles<Shape>(
  Consts.Label,
  sheet,
  {
    getVariant: ({ mediaqCode }) => ({ mediaqCode }),
    variantToString: ({ mediaqCode }) => mediaqCode.small.toString(),
    defaultProps: {
      $mediaq: {
        small: [0, 800]
      }
    }
  },
  overrideOptions
)(label)

export const Label = LabelCreator(null)
export const LabelCascading = LabelCreator({ withCascading: true })


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
    <LabelCascading.Provider className={{ fontStyle: 'italic' }}>
      <LabelCascading>Label 2</LabelCascading>
      <Label>Label 3</Label>
    </LabelCascading.Provider>
  </View>
</AppContainer>

export default App

