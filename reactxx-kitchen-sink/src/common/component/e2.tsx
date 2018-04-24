import React from 'react'
import ReactN from 'react-native'

import { TComps, TTheme, TBasic, TAddInConfig, Text, View, ScrollView, Icon, withStyles} from 'reactxx'
import MDI from 'reactxx-mdi'

import { H4 } from '../components/typo'

/************************
* TYPINGS
*************************/

export const enum Consts {
  Label = 'comp$label2' //unique component name
}

// 
type Variant = 'normal' | 'outline' | 'link'
type LabelShape = TBasic.OverwriteShape<{
  common: TComps.ShapeViews<'root' | 'normalVariant' | 'outlineVariant' | 'linkVariant'> & TComps.ShapeTexts<'label'>,
  props: {
    variant: Variant,
  },
  nameType: Consts.Label
}>

/************************
* SHEET
*************************/

const sheet: TBasic.SheetX<LabelShape> = {
  // ruleset placeholders:
  root: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
    borderRadius: 2,
    borderColor: 'blue',
    borderStyle: 'solid',
  },
  label: {
  },

  // ruleset flags - overrides placeholders when used
  normalVariant: {
    $overrides: {
      root: {
        borderWidth: 1,
        backgroundColor: 'blue',
      },
      label: {
        color: 'white'
      },
    }
  },
  outlineVariant: {
    $overrides: {
      root: {
        borderWidth: 1,
        backgroundColor: 'white',
      },
      label: {
        color: 'blue'
      },
    }
  },
  linkVariant: {
    $overrides: {
      root: {
        backgroundColor: 'white',
        borderWidth: 0,
      },
      label: {
        color: 'blue',
        fontWeight: 'bold'
      },
    }
  },
}

/************************
* CODE
*************************/
const label: TBasic.CodeSFC<LabelShape> = ({ classes, mergeRulesetWithOverrides, children, variant, style }) => {
  const root = mergeRulesetWithOverrides(
    classes.root,
    (!variant || variant === 'normal') && classes.normalVariant,
    variant === 'link' && classes.linkVariant,
    variant === 'outline' && classes.outlineVariant,
  ) as TBasic.ViewRulesetX
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
const App: React.SFC = props => <ScrollView className={{ flex: 1 }}>
  <H4>Default</H4>
  <View className={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between', justifyContent: 'space-between' }}>
    <Label>DEFAULT</Label>
    <Label variant='link'>LINK</Label>
    <Label variant='outline'>OUTLINE</Label>
    <Label variant='normal'>NORMAL</Label>
  </View>
  <H4>STYLING</H4>
  <View className={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between', justifyContent: 'space-between' }}>
    <Label variant='outline' classes={{ outlineVariant: { $overrides: { root: { borderWidth: 3, borderRadius: 10 }, label: { color: 'green' } } } } }>THIN BORDER</Label>
  </View>

</ScrollView >

export default App

