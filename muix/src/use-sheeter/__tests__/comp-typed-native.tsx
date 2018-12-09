/** @jsx platform.createElement */

import React from 'react'
import {Text, View} from 'react-native'

import { platform, getEngine } from "reactxx-sheeter"
import { TTyped, T, V } from 'reactxx-typings'
import { useSheeter, TUseSheeter, getComponentCreator } from "reactxx-use-sheeter"

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

const config: TUseSheeter.AuthorConfig<Shape> = {
  defaultSheet
}

const getComp: TUseSheeter.GetComponent<Shape> = (authorConfig, displayName) => props => {
  const { toClassNames, classes, classNames, styles, propsCode: { children } }
    = useSheeter<Shape>(props, authorConfig, displayName)

  return <View classNames={toClassNames(classes.root, classNames /* ERROR: , classes.label*/)} styles={styles}>
    <Text classNames={toClassNames(classes.label)}>
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
