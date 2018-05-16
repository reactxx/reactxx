import React from 'react'

import { LoremIpsum, TCommon, TCommonStyles, mergeRulesets } from 'reactxx-basic'
import { Text, View } from 'reactxx-primitives'
import { Types, withStylesCreator } from 'reactxx-animation'

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
    anim2: TCommon.ShapeViews<'rootAnim'>
  }
  events: TCommon.TEventOnPress
}>

/************************
* SHEET
*************************/

const sheet: Types.SheetX<Shape> = {
  $animations: {
    anim1: {
      rootAnim: { opacity: [1, 0.2] },
      labelAnim: {
        transform: [
          { translateX: [0, -150] }
        ]},
      $duration: 1000
    },
    anim2: {
      rootAnim: {},
    }
  },
  root: {
    margin: 10,
    backgroundColor: 'blue',
    width: 150,
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
  const { system: { classes, animations: { sheets: { anim1 } }, onPress }, children } = props
  const root = mergeRulesets<Types.ViewRulesetX>(classes.root, anim1.sheet.rootAnim)
  const label = mergeRulesets<Types.TextRulesetX>(classes.label, anim1.sheet.labelAnim)
  return <View onPress={onPress} className={root}>
    <Text className={label}>
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

const App: React.SFC = props => {
  return <Label onPress={ev => ev.current.system.animations.sheets.anim1.toggle()}>TOOGGLE ANIM1</Label>
}

//    <Label onPress={() => { }}>TOOGGLE ANIM2</Label>


export default App

