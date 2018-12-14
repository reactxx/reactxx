

import React from 'react'
import { getTypedEngine } from "reactxx-styles"
import { TComponents, TTyped, T, V } from 'reactxx-typings'
import { getComponentCreator } from "reactxx-styles"

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
  sheet
}

const getComp: TComponents.GetComponent<Shape> = useStyles => props => {
  const {
    getRootWebStyleProps,
    getWebStyleProps,
    classes,
    propsCode: { children }
  } = useStyles(props)

  return <div {...getRootWebStyleProps()}>
    <span {...getWebStyleProps(classes.label)}>
      {children}
    </span>
  </div>
}

const compCreator = getComponentCreator(getComp, 'CompDisplayName', config)

const Comp = compCreator()

const App: React.SFC = props => <React.Fragment>
  <Comp>Hallo Comp!</Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App
