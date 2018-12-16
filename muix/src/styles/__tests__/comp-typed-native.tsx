import React from 'react'
import { Text, View } from 'reactxx-styles-native'

import { getTypedEngine } from "reactxx-styles"
import { TComponents, TTyped, T, V } from 'reactxx-typings'
import { getComponent } from "reactxx-styles"
import { useStyles } from "reactxx-styles"

interface ShapeLow extends TTyped.ShapeAncestor {
  props: { disabled?: boolean },
}
const { STYLE, IF } = getTypedEngine<ShapeLow>()

const sheet = {
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
  sheet: typeof sheet
}

const config: TComponents.ComponentConfig<Shape> = {
  displayName: 'CompDisplayName',
  $sheet: sheet
}

const getComp: TComponents.GetComponent<Shape> = config => props => {

  const { getNativeStyleProps, getRootNativeStyleProps, classes, propsCode: { children } } = useStyles<Shape>(props, config)

  return <View {...getRootNativeStyleProps()}>
    <Text {...getNativeStyleProps(classes.label)}>
      {children}
    </Text>
  </View>
}

const Comp = getComponent(getComp, config)

const App: React.SFC = props => <React.Fragment>
  <Comp>Hallo Comp!</Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App
