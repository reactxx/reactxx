/** @jsx platform.createElement */

import { platform, IF } from "reactxx-sheeter"
import { useSheeterUntyped, getComponentCreator } from "reactxx-use-sheeter"

const config = {
  defaultSheet: {
    root: [
      { backgroundColor: 'lightblue' },
      IF(p => p.disabled, { backgroundColor: 'lightgray' })
    ],
    label: [
      { color: 'darkblue' },
      IF(p => p.disabled, { color: 'darkgray' })
    ]
  }
}

const getComp = (authorConfig, displayName) => props => {
  
  const { propsCode: { children }, classes, classNames, styles } = useSheeterUntyped(props, authorConfig, displayName)

  return <div classNames={[classes.root, classNames] as any} styles={styles}>
    <span classNames={classes.label}>
      {children}
    </span>
  </div>
}

export const compCreator = getComponentCreator('CompUntypedDisplayName', config, getComp)

export const Comp = compCreator()
