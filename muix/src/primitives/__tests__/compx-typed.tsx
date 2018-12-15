

import React from 'react'
import { getTypedEngine } from "reactxx-styles"
import { TComponents, TTyped, T, V } from 'reactxx-typings'
import { getComponentCreator, STYLE } from "reactxx-styles"
import { View, Text, TPrimitives } from 'reactxx-primitives'

interface ShapeLow extends TTyped.ShapeAncestor {
  props: { disabled?: boolean },
}
const { IF } = getTypedEngine<ShapeLow>()

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
  rootProps: TComponents.Props<TPrimitives.ViewShape>
}

const config: TComponents.ComponentConfig<Shape> = {
  displayName: 'CompDisplayName',
  $sheet: sheet
}

const getComp: TComponents.GetComponent<Shape> = useStyles => props => {
  const {
    style,
    className,
    classes,
    propsCode: { children, $rootProps }
  } = useStyles(props)

  return <View className={[classes.root, className]} style={style} {...$rootProps} >
    <Text className={classes.label}>
      {children}
    </Text>
  </View>
}

const compCreator = getComponentCreator(getComp, config)

const Comp = compCreator()

const App: React.SFC = props => <React.Fragment>
  <Comp
    $rootProps={{ style: STYLE<V>({ marginTop: 10 }) }}
    classes={{ root: STYLE<V>({ margin: 10 }) }}
  >
    Hallo Comp!
  </Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App
