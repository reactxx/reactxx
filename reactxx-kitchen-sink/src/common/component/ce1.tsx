import React from 'react'
import ReactN from 'react-native'

import { TComps, TBasic, TAddInConfig, Text, View, ScrollView, Icon, withStylesCreator } from 'reactxx'
import MDI from 'reactxx-mdi'

import { H4 } from '../components/typo'

/************************
* TYPINGS
*************************/

export const enum Consts {
  Label = 'ks$ce1$label1' //unique component name
}

// 
type Shape = TBasic.OverwriteShape<{
  common: TComps.ShapeViews<'root'> & TComps.ShapeTexts<'label' | 'icon' | 'iconGap'>,
  props: {
    iconData: string,
  },
  nameType: Consts.Label
}>

/************************
* SHEET
*************************/

const sheet: TBasic.SheetX<Shape> = {
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
const label: TBasic.CodeSFC<Shape> = ({ classes, mergeRulesetWithOverrides, children, iconData, style }) => {
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
export const LabelCreator = withStylesCreator<Shape>(Consts.Label, sheet, label)
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
const iconHeart = MDI.Heart

const App: React.SFC = props => <ScrollView className={{ flex: 1 }}>
  <H4>Default</H4>
  <Section>
    <Label>Label 1</Label>
    <Label iconData={iconHeart} />
    <Label iconData={iconHeart}>Label 2</Label>
  </Section>
  <H4>ROOT STYLING PRECEDENCE</H4>
  <Section>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} iconData={iconHeart}>Label 3</Label>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} className={{ backgroundColor: 'red' }} iconData={iconHeart}>Label 4</Label>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} className={{ backgroundColor: 'red' }} style={{ backgroundColor: 'green' }} iconData={iconHeart}>Label 5</Label>
  </Section>
  <H4>DEEP STYLING WITH CLASSES</H4>
  <Section>
    <Label classes={{ root: { padding: 30, borderRadius: 8 }, iconGap: { marginRight: 30 }, icon: { fontSize: 36, color: 'yellow' } }} iconData={iconHeart}>Label 6</Label>
  </Section>
  <H4>PROPERTY CASCADING</H4>
  <LabelC.Provider className={{ borderRadius: 12 }} iconData={iconHeart}>
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

