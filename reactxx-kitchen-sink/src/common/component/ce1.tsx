import React from 'react'
import ReactN from 'react-native'

import { deepMerges } from 'reactxx-basic';
import MDI from 'reactxx-mdi'
import { TComps, TBasic, TAddInConfig, Text, View, ScrollView, Icon, withStylesCreator } from 'reactxx'

import { H2 } from '../components/typo'

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
const label: TBasic.CodeSFC<Shape> = ({ system: { classes, style, mergeRulesetWithOverrides }, children, iconData }) => {
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
export const LabelC = LabelCreator({ withCascading: true})

export const LabelEx = LabelCreator({ defaultProps: { iconData: MDI.Play, classes: { label: { color: 'red' } } } })


/************************************************
*************************************************
*
* EXAMPLE
*
*************************************************
*************************************************/
const Section: React.SFC = ({ children }) => <View className={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{children}</View>
const iconHeart = MDI.Heart

//const App = props => <LabelC.Provider className={{ borderRadius: 12 }} iconData={iconHeart}>
//</LabelC.Provider>

const App: React.SFC = props => <ScrollView className={{ flex: 1 }}>
  <H2>Default</H2>
  <Section>
    <Label>Label 1</Label>
    <Label iconData={iconHeart} />
    <Label iconData={iconHeart}>Label 2</Label>
  </Section>
  <H2>STYLING PRECEDENCE</H2>
  <Section>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} iconData={iconHeart}>Label 3</Label>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} className={{ backgroundColor: 'red' }} iconData={iconHeart}>Label 4</Label>
    <Label classes={{ root: { backgroundColor: 'lightblue' } }} className={{ backgroundColor: 'red' }} style={{ backgroundColor: 'green' }} iconData={iconHeart}>Label 5</Label>
  </Section>
  <H2>DEEP STYLING WITH CLASSES</H2>
  <Section>
    <Label classes={{ root: { padding: 30, borderRadius: 8 }, iconGap: { marginRight: 30 }, icon: { fontSize: 36, color: 'yellow' } }} iconData={iconHeart}>Label 6</Label>
  </Section>
  <H2>PROPERTY CASCADING</H2>
  <LabelC.Provider className={{ borderRadius: 12 }} iconData={iconHeart}>
    <Section>
      <LabelC>Label 7</LabelC>
      <LabelC.Provider classes={{ root: { backgroundColor: 'lightgreen', borderColor: 'darkgreen' }, label: { color: 'darkgreen' } }} iconData={MDI.Stop}>
        <LabelC>Label 8</LabelC>
      </LabelC.Provider>
      <LabelC>Label 9</LabelC>
    </Section>
  </LabelC.Provider>
  <H2>LABEL WITH PROPS</H2>
  <Section>
    <LabelEx>Label 10</LabelEx>
    <LabelEx iconData={MDI.Stop} classes={{ label: { color: 'white' } }}>Label 11</LabelEx>
  </Section>
</ScrollView>


export default App

