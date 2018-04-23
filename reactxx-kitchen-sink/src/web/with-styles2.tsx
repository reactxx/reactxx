import React from 'react'
import ReactN from 'react-native'
import ReactDOM from 'react-dom'

import { TComps, TBasic, TAddInConfig, Text, View, ScrollView, Icon } from 'reactxx'
import { withStyles, ThemeProvider } from '../../reactxx/common/withStyles2'
import { MediaQSheet, MediaQ_AppContainer } from 'reactxx-mediaq'

/************************
* TYPINGS
*************************/

export const enum Consts {
  Label = 'comp$withstyle2' //unique component name
}

// 
type LabelShape = TBasic.OverwriteShape<{
  common: TComps.ShapeViews<'root'> & TComps.ShapeTexts<'label'>,
  props: {
  },
  nameType: Consts.Label
}>

/************************
* SHEET
*************************/

const sheet: TBasic.SheetX<LabelShape> = {
  root: {
    backgroundColor: 'blue',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'darkblue',
    borderStyle: 'solid',
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  label: {
    color: 'white'
  },
}

/************************
* CODE
*************************/
const label: TBasic.CodeSFC<LabelShape> = ({ classes, mergeRulesetWithOverrides, children, style }) => {
  const root = mergeRulesetWithOverrides(classes.root) as TBasic.ViewRulesetX
  const label = mergeRulesetWithOverrides(classes.label) as TBasic.TextRulesetX
  return <View className={root} style={style as TBasic.ViewRulesetX}>
    <Text className={label}>{children}</Text>
  </View>
}

/************************
* EXPORTED COMPONENT
*************************/
export const Label = withStyles<LabelShape>(Consts.Label, sheet)(label)


/************************************************
*************************************************
*
* EXAMPLE
*
*************************************************
*************************************************/
const classes = (theme, par) => ({
  root: {
    $mediaq: {
      '-480': { color: 'red' },
      '480-1024': { color: 'blue' },
      '1024-': { color: 'green' },
    },
    fontSize: par.$mediaqCode.small ? 24 : 48
  }
})

const App: React.SFC = props => <MediaQ_AppContainer>
  <ThemeProvider value={{ type: 'ThemeX', $cache: {} }}>
    <Text classes={classes} $mediaq={{small: [0, 800]} as any}>Label 1</Text>
  </ThemeProvider>
</MediaQ_AppContainer>

export default App

