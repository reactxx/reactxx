

import React from 'react'
import { getEngine } from "reactxx-styles"
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
  const {
    getStylePropsRootWeb,
    getStylePropsWeb,
    classes,
    propsCode: { children }
  } = useStyles(props)

  return <div {...getStylePropsRootWeb()}>
    <span {...getStylePropsWeb(classes.label)}>
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
