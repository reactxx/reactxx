/** @jsx platform.createElement */

import { platform, getEngine } from "reactxx-sheeter"
import { TTyped, T, V } from 'reactxx-typings'
import { useSheeter, TUseSheeter, getComponentCreator } from "reactxx-use-sheeter"

import { initPlatform, render } from "./init-platform.t"

interface ShapeLow extends TTyped.ShapeAncestor {
  props: { disabled?: boolean },
}
const { STYLE, IF } = getEngine<ShapeLow>()

const defaultSheet = {
  root: STYLE<V>(
    { backgroundColor: 'lightblue' },
    IF<V>(p => p.disabled, { backgroundColor: 'lightgray' })
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
  const { propsCode: { children }, classes, classNames, styles }
    = useSheeter<Shape>(props, authorConfig, displayName)

  return <div classNames={[classes.root, classNames] as any} styles={styles}>
    <span classNames={classes.label}>
      {children}
    </span>
  </div>
}

const compCreator = getComponentCreator('CompDisplayName', config, getComp)

export const Comp = compCreator()
