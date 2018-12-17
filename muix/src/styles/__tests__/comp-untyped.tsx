import React from 'react'
import { $if } from "reactxx-styles"
import { getComponentUntyped as getComponent } from "reactxx-styles"

let $tag

const config = {
  defaultSheet: {
    root: [
      { backgroundColor: 'lightblue', margin: 10 },
      $if(p => p.disabled, { backgroundColor: 'lightgray' })
    ],
    label: [
      { color: 'darkblue' },
      $if(p => p.disabled, { color: 'darkgray' })
    ],

    Label: [
      $tag(),
      { color: 'darkblue' },
      $if(p => p.disabled, { color: 'darkgray' })
    ],
    Root: [
      { backgroundColor: 'lightblue', margin: 10 },
      $if(p => p.disabled, { backgroundColor: 'lightgray' })
    ],

  }
}

const getComp = useStyles => props => {
  
  const { getRootWebStyleProps, getWebStyleProps, propsCode: { children }, classes } = useStyles(props)

  return <div {...getRootWebStyleProps(classes.root)} >
    <span className={getWebStyleProps(classes.label)}>
      {children}
    </span>
  </div>
}

const getComp2 = useStyles => props => {
  
  const { propsCode: { children }, classes } = useStyles(props)

  return <classes.Root>
    <classes.Label>
      {children}
    </classes.Label>
  </classes.Root>
}

const Comp = getComponent(getComp, config)

const App = props => <React.Fragment>
  <Comp>Hallo Comp!</Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App