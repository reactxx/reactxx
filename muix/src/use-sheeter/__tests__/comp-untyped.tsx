/** @jsx platform.createElement */

import React from 'react'
import { platform, IF } from "reactxx-sheeter"
import { useSheeterUntyped as useSheeter, getComponentCreatorUntyped as getComponentCreator } from "reactxx-use-sheeter"

const config = {
  defaultSheet: {
    root: [
      { backgroundColor: 'lightblue', margin: 10 },
      IF(p => p.disabled, { backgroundColor: 'lightgray' })
    ],
    label: [
      { color: 'darkblue' },
      IF(p => p.disabled, { color: 'darkgray' })
    ]
  }
}

const getComp = (authorConfig, displayName) => props => {
  
  const { toClassNames, propsCode: { children }, classes, classNames, styles } = useSheeter(props, authorConfig, displayName)

  return <div classNames={toClassNames(classes.root, classNames)} styles={styles}>
    <span classNames={toClassNames(classes.label)}>
      {children}
    </span>
  </div>
}

const compCreator = getComponentCreator('CompUntypedDisplayName', config, getComp)
const Comp = compCreator()

const App = props => <React.Fragment>
  <Comp>Hallo Comp!</Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App