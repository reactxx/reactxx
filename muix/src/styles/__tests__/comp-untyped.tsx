import React from 'react'
import { $if } from "reactxx-styles"
import { getComponentCreatorUntyped as getComponentCreator } from "reactxx-styles"

const config = {
  defaultSheet: {
    root: [
      { backgroundColor: 'lightblue', margin: 10 },
      $if(p => p.disabled, { backgroundColor: 'lightgray' })
    ],
    label: [
      { color: 'darkblue' },
      $if(p => p.disabled, { color: 'darkgray' })
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