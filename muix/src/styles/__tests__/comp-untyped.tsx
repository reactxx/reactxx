import React from 'react'
import { platform, IF } from "reactxx-styles"
import { useStylesUntyped as useSheeter, getComponentCreatorUntyped as getComponentCreator } from "reactxx-styles"

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

const getComp = useStyles => props => {
  
  const { toClassNameRoot, toClassName, propsCode: { children }, classes } = useStyles(props)

  return <div {...toClassNameRoot(classes.root)} >
    <span className={toClassName(classes.label)}>
      {children}
    </span>
  </div>
}

const compCreator = getComponentCreator(getComp, 'CompUntypedDisplayName', config)
const Comp = compCreator()

const App = props => <React.Fragment>
  <Comp>Hallo Comp!</Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App