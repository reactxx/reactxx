import React from 'react'

import { getTypedEngine } from "reactxx-styles"
import { TComponents, TTyped, T, V } from 'reactxx-typings'
import { getComponent } from "reactxx-styles"
import { View, Text, TPrimitives } from 'reactxx-primitives'
import { useStyles } from "reactxx-styles"

interface ShapeLow extends TTyped.ShapeAncestor {
  props: { disabled?: boolean },
}
const { IF, STYLE } = getTypedEngine<ShapeLow>()

let PRIMITIVE = <T extends any = any>(type: T, ...pars: any[]) => null
let POSE = <T extends any = any>(type: T, ...pars: any[]) => null
let COMPONENT = <R extends TTyped.Shape = any>(type: TComponents.SFC<R>, sheet: TTyped.PartialSheet<R>, props: TComponents.Props<R>) => null

let STYLED

const sheet = {

  root: STYLE<V>(
    { backgroundColor: 'lightblue', margin: 10 },
    IF<V>(p => p.disabled, { backgroundColor: 'lightgray', /* ERROR: color: 'red'*/ })
  ),

  label: STYLE<T>(
    { color: 'darkblue' },
    IF<T>(p => p.disabled, { color: 'darkgray' })
  ),

  Root: PRIMITIVE<V>('V',
    {
      root: {}
    }, {
      singleLine: true
    }
  ),

  Anim: POSE<V>('V',
    {

    }, {
      root: {}
    }, {
      singleLine: true
    }
  ),

  Comp: COMPONENT(Text,
    {
      root: {}
    }, {
      singleLine: true
    }
  ),

}

interface Shape extends ShapeLow {
  sheet: typeof sheet
  rootProps: TComponents.Props<TPrimitives.ViewShape>
}

const config: TComponents.ComponentConfig<Shape> = {
  displayName: 'CompDisplayName',
  $sheet: sheet
}

const getComp: TComponents.GetComponent<Shape> = config => props => {
  const {
    style,
    className,
    classes,
    propsCode: { children, $rootProps }
  } = useStyles<Shape>(props, config)

  return <View className={[classes.root, className]} style={style} {...$rootProps} >
    <Text className={classes.label}>
      {children}
    </Text>
  </View>
}

const getComp2: TComponents.GetComponent<Shape> = config => props => {
  const {
    classes,
    propsCode: { children, $rootProps }
  } = useStyles<Shape>(props, config)


  return <classes.Root>
    {children}
  </classes.Root>
}


const Comp = getComponent(getComp, config)

const App: React.SFC = props => <React.Fragment>
  <Comp
    $rootProps={{ style: STYLE<V>({ marginTop: 10 }) }}
    classes={{ root: STYLE<V>({ margin: 10 }) }}
  >
    Hallo Comp!
  </Comp>
  <Comp disabled>Hallo Comp (disabled)!</Comp>
</React.Fragment>

export default App
