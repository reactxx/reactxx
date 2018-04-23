import React from 'react'
import ReactN from 'react-native'
import ReactDOM from 'react-dom'

import { TTheme, TComps, TBasic, TAddInConfig, Text, View, ScrollView, Icon } from 'reactxx'
import { withStyles, ThemeProvider } from '../../reactxx/common/withStyles2'
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
    fontSize: variant.$mediaqCode.small ? 24 : 48
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
export const Label = withStyles<Shape>(
  Consts.Label,
  sheet,
  {
    getVariant: ({ $mediaqCode }) => ({ $mediaqCode }),
    defaultProps: {
      $mediaq: {
        small: [0, 800]
      }
    }
  }
)(label)


/************************************************
*************************************************
*
* EXAMPLE
*
*************************************************
*************************************************/

const App: React.SFC = props => <MediaQ.MediaQ_AppContainer>
  <ThemeProvider value={{ type: 'ThemeX', $cache: {} }}>
    <Label>Label 1</Label>
  </ThemeProvider>
</MediaQ.MediaQ_AppContainer>

export default App

