

import React from 'react'
import {Text, View} from 'reactxx-sheeter-native'

import {  getEngine } from "reactxx-sheeter"
import { TComponents, TTyped, T, V } from 'reactxx-typings'
import { useSheeter, getComponentCreator } from "reactxx-use-sheeter"

interface ShapeLow extends TTyped.ShapeAncestor {
  props: { disabled?: boolean },
}
const { STYLE, IF } = getEngine<ShapeLow>()

const defaultSheet = {
  root: STYLE<V>(
    { backgroundColor: 'lightblue', margin: 10 },
    IF<V>(p => p.disabled, { backgroundColor: 'lightgray', /* ERROR: color: 'red'*/ })
  ),
  label: STYLE<T>(
    { color: 'darkblue' },
    IF<T>(p => p.disabled, { color: 'darkgray' })
  )
}

interface Shape extends ShapeLow {
  sheet: typeof defaultSheet
}

const config: TComponents.AuthorConfig<Shape> = {
  defaultSheet
}

const getComp: TComponents.GetComponent<Shape> = (authorConfig, displayName) => props => {
  const { styleNative, styleRootNative, classes, propsCode: { children } }
    = useSheeter<Shape>(props, authorConfig, displayName)

  return <View {...styleRootNative()}>
    <Text {...styleNative(classes.label)}>
      {children}
    </Text>
  </View>
}

const compCreator = getComponentCreator('CompDisplayName', config, getComp)

const Comp = compCreator()

const App: React.SFC = props => <React.Fragment>
  <Comp>Hallo Comp!</Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App
