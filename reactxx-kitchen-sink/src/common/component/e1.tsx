import React from 'react'

import { TSheets, TComps, TTheme, TBasic, Text, View, ScrollView, Icon, withStyles } from 'reactxx'
import MDI from 'reactxx-mdi'

import { H4 } from '../components/typo'

/************************
* TYPINGS
*************************/

const enum Consts {
  Label = 'comp$label1' //unique component name
}

// 
type LabelShape = TSheets.OverwriteShape<{
  common: TComps.ShapeViews<'root'> & TComps.ShapeTexts<'label' | 'icon' | 'iconWithLabel'>,
  props: {
    iconData: string,
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
    marginBottom:2,
  },
  label: {
    color: 'white'
  },
  icon: {
    fontSize: 20
  },
  iconWithLabel: {
    marginRight: 5
  },
}

/************************
* CODE
*************************/
const label: TBasic.CodeSFC<LabelShape> = ({ classes, mergeRulesetWithOverrides, children, iconData, style }) => {
  const root = mergeRulesetWithOverrides(classes.root) as TBasic.ViewRulesetX
  const hasChildren = React.Children.count(children) > 0
  const icon = iconData && mergeRulesetWithOverrides(classes.label, classes.icon, hasChildren && classes.iconWithLabel) as TBasic.TextRulesetX
  const label = mergeRulesetWithOverrides(classes.label) as TBasic.TextRulesetX
  return <View className={root} style={style as TBasic.ViewRulesetX}>
    {iconData && <Icon data={iconData} className={icon} />}
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
    <Label>Label 1</Label>
    <Label iconData={MDI.Heart} />
    <Label iconData={MDI.Heart}>Label 2</Label>
  </View>
  <H4>ROOT STYLING PRECEDENCE</H4>
  <View className={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between', justifyContent: 'space-between' }}>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} iconData={MDI.Heart}>Label 3</Label>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} className={{ backgroundColor: 'red' }} iconData={MDI.Heart}>Label 4</Label>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} className={{ backgroundColor: 'red' }} style={{ backgroundColor: 'green' }} iconData={MDI.Heart}>Label 5</Label>
  </View>
  <H4>DEEP STYLING WITH CLASSES</H4>
  <View className={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'space-between', justifyContent: 'space-between' }}>
    <Label classes={{ root: { padding: 30, borderRadius: 8 }, iconWithLabel: { marginRight: 30 }, icon: { fontSize: 36, color: 'yellow' } }} iconData={MDI.Heart}>Label 6</Label>
  </View>
</ScrollView>

export default App

