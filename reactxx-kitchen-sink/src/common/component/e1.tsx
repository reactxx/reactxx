import React from 'react'
import ReactN from 'react-native'

import { TComps, TBasic, TAddInConfig, Text, View, ScrollView, Icon, withStylesCreator } from 'reactxx'
import MDI from 'reactxx-mdi'

import { H4 } from '../components/typo'

/************************
* TYPINGS
*************************/

export const enum Consts {
  Label = 'comp$label1' //unique component name
}

// 
type LabelShape = TBasic.OverwriteShape<{
  common: TComps.ShapeViews<'root'> & TComps.ShapeTexts<'label' | 'icon' | 'iconGap'>,
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
    marginBottom: 10,
    marginRight: 10,
  },
  label: {
    color: 'white'
  },
  icon: {
    fontSize: 20
  },
  iconGap: {
    marginRight: 5
  },
}

/************************
* CODE
*************************/
const label: TBasic.CodeSFC<LabelShape> = ({ classes, mergeRulesetWithOverrides, children, iconData, style }) => {
  const root = mergeRulesetWithOverrides(classes.root) as TBasic.ViewRulesetX
  const hasChildren = React.Children.count(children) > 0
  const icon = iconData && mergeRulesetWithOverrides(classes.label, classes.icon, hasChildren && classes.iconGap) as TBasic.TextRulesetX
  const label = mergeRulesetWithOverrides(classes.label) as TBasic.TextRulesetX
  return <View className={root} style={style as TBasic.ViewRulesetX}>
    {iconData && <Icon data={iconData} className={icon} />}
    <Text className={label}>{children}</Text>
  </View>
}

/************************
* EXPORTED COMPONENT
*************************/
export const LabelCreator = withStylesCreator<LabelShape>(Consts.Label, sheet, label)
export const Label = LabelCreator()

// allow property cascading
export const LabelC = LabelCreator({ withCascading: true })


/************************************************
*************************************************
*
* EXAMPLE
*
*************************************************
*************************************************/
const Section: React.SFC = ({ children }) => <View className={{ flexDirection: 'row', flexWrap: 'wrap' }}>{children}</View>

const App: React.SFC = props => <ScrollView className={{ flex: 1 }}>
  <H4>Default</H4>
  <Section>
    <Label>Label 1</Label>
    <Label iconData={MDI.Heart} />
    <Label iconData={MDI.Heart}>Label 2</Label>
  </Section>
  <H4>ROOT STYLING PRECEDENCE</H4>
  <Section>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} iconData={MDI.Heart}>Label 3</Label>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} className={{ backgroundColor: 'red' }} iconData={MDI.Heart}>Label 4</Label>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} className={{ backgroundColor: 'red' }} style={{ backgroundColor: 'green' }} iconData={MDI.Heart}>Label 5</Label>
  </Section>
  <H4>DEEP STYLING WITH CLASSES</H4>
  <Section>
    <Label classes={{ root: { padding: 30, borderRadius: 8 }, iconGap: { marginRight: 30 }, icon: { fontSize: 36, color: 'yellow' } }} iconData={MDI.Heart}>Label 6</Label>
  </Section>
  <H4>PROPERTY CASCADING</H4>
  <LabelC.Provider className={{ borderRadius: 12 }} iconData={MDI.Heart}>
    <Section>
      <LabelC>Label 7</LabelC>
      <LabelC.Provider classes={{ root: { backgroundColor: 'lightgreen', borderColor: 'darkgreen' }, label: { color: 'darkgreen' } }} iconData={MDI.Stop}>
        <LabelC>Label 8</LabelC>
      </LabelC.Provider>
      <LabelC>Label 9</LabelC>
    </Section>
  </LabelC.Provider>
</ScrollView>

export default App

