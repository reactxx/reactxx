

import React from 'react'
import {Text, View} from 'reactxx-styles-native'

import {  getEngine } from "reactxx-styles"
import { TComponents, TTyped, T, V } from 'reactxx-typings'
import { getComponentCreator } from "reactxx-styles"

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

const getComp: TComponents.GetComponent<Shape> = useStyles => props => {
  const { getStylePropsNative, getStylePropsRootNative, classes, propsCode: { children } }
    = useStyles(props)

  return <View {...getStylePropsRootNative()}>
    <Text {...getStylePropsNative(classes.label)}>
      {children}
    </Text>
  </View>
}

const compCreator = getComponentCreator(getComp, 'CompDisplayName', config)

const Comp = compCreator()

const App: React.SFC = props => <React.Fragment>
  <Comp>Hallo Comp!</Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App
