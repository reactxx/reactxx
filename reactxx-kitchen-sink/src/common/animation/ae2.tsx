import React from 'react'

import { LoremIpsum, TCommon, TCommonStyles, mergeRulesets } from 'reactxx-basic'
import { Text, View, ScrollView } from 'reactxx-primitives'
import { Types, withStylesCreator } from 'reactxx-animation'

import { H2 } from '../components/typo'

/************************
* TYPINGS
*************************/

export const enum Consts {
  Label = 'ks$ae2$label' //unique component name
}

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeViews<'root'> & TCommon.ShapeTexts<'label'>
  nameType: Consts.Label
  animation: { //animation sheets
    anim1: TCommon.ShapeViews<'rootAnim'> & TCommon.ShapeTexts<'labelAnim'>
    anim2: TCommon.ShapeViews<'rootAnim'> & TCommon.ShapeTexts<'labelAnim'>
    anim3: TCommon.ShapeViews<'rootAnim'> & TCommon.ShapeTexts<'labelAnim'>
  }
  props: {
    isAnim1: boolean
    isAnim2: boolean
    isAnim3: boolean
  }
  events: TCommon.TEvents
}>

/************************
* SHEET
*************************/

const sheet: Types.SheetX<Shape> = {
  $animations: {
    anim1: {
      rootAnim: {
        opacity: [1, 0.2]
      },
      labelAnim: {
        transform: [
          { translateX: [0, -180] }
        ]
      },
      $duration: 1000
    },
    anim2: {
      rootAnim: {
        opacity: [1, 0.2, '-50'] // means 0%-50% of $duration
      },
      labelAnim: {
        transform: [
          { scale: [1, 0] },
          { rotate: ['0', '180deg'] },
          '50-' // means 50%-100% of $duration
        ],
      },
      $duration: 2000
    },
    anim3: {
      rootAnim: {
        opacity: [1, 0.2] 
      },
      labelAnim: {
        transform: [
          { translateX: [0, -180] },
          '10-20' // means 10%-20% of $duration
        ],
      },
      $duration: 1000
    },
  },
  root: {
    margin: 10,
    backgroundColor: 'blue',
    width: 180,
    padding: 10,
  },
  label: {
    color: 'white'
  }
}

/************************
* CODE
*************************/
const label: Types.CodeSFC<Shape> = props => {
  const { system: { classes, animations: { sheets: { anim1, anim2, anim3 } }, onPress, onPressIn, onPressOut }, isAnim1, isAnim2, isAnim3, children, ...rest } = props
  const root = mergeRulesets<Types.ViewRulesetX>(classes.root, isAnim1 && anim1.sheet.rootAnim, isAnim2 && anim2.sheet.rootAnim, isAnim3 && anim3.sheet.rootAnim)
  const label = mergeRulesets<Types.TextRulesetX>(classes.label, isAnim1 && anim1.sheet.labelAnim, isAnim2 && anim2.sheet.labelAnim, isAnim3 && anim3.sheet.labelAnim)
  return <View {...rest} className={root}>
    <Text className={label} developer_flag>
      {children}
    </Text>
  </View>
}

export const Label = withStylesCreator<Shape>(Consts.Label, sheet, label)()

/************************************************
*************************************************
*
* EXAMPLE
*
*************************************************
*************************************************/
const Section: React.SFC = ({ children }) => <View className={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>{children}</View>

const App: React.SFC = props => <ScrollView className={{ flex: 1 }}>
  <Section>
    <H2>SIMPLE (ANIM1)</H2>
    <Label isAnim1 onPress={ev => ev.current.system.animations.sheets.anim1.toggle()}>TOOGGLE ANIM1</Label>
    <Label isAnim1 onPressIn={ev => ev.current.system.animations.sheets.anim1.open()} onPressOut={ev => ev.current.system.animations.sheets.anim1.close()}>OPEN x CLOSE</Label>
  </Section>
  <Section>
    <H2>WITH DELAY (ANIM2)</H2>
    <Label isAnim2 onPress={ev => ev.current.system.animations.sheets.anim2.toggle()}>TOOGGLE ANIM2</Label>
    <Label isAnim2 onPressIn={ev => ev.current.system.animations.sheets.anim2.open()} onPressOut={ev => ev.current.system.animations.sheets.anim2.close()}>OPEN x CLOSE</Label>
  </Section>
  <Section>
    <H2>WITH DELAY (ANIM3)</H2>
    <Label isAnim3 onPress={ev => ev.current.system.animations.sheets.anim3.toggle()}>TOOGGLE ANIM3</Label>
    <Label isAnim3 onPressIn={ev => ev.current.system.animations.sheets.anim3.open()} onPressOut={ev => ev.current.system.animations.sheets.anim3.close()}>OPEN x CLOSE</Label>
  </Section>
  <Section>
    <H2>CHANGE DURATION (ANIM1)</H2>
    <Label isAnim1 classes={{ $animations: { anim1: { $duration: 250 } } }} onPress={ev => ev.current.system.animations.sheets.anim1.toggle()}>TOOGGLE ANIM1</Label>
  </Section>
</ScrollView>

export default App

