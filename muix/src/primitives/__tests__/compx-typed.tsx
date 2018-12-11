

import React from 'react'
import { getEngine } from "reactxx-sheeter"
import { TComponents, TTyped, T, V } from 'reactxx-typings'
import { useSheeter, getComponentCreator } from "reactxx-use-sheeter"
import { View, Text } from 'reactxx-primitives'

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
  const {
    styles,
    classNames,
    classes,
    propsCode: { children }
  } = useSheeter<Shape>(props, authorConfig, displayName)

  return <View classNames={[classes.root, classNames]} styles={styles}>
    <Text classNames={classes.label}>
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
