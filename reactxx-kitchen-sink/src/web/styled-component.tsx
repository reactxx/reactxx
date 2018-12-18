import React from 'react'

import { getTypedEngine, getComponent } from 'reactxx-styles'
import { TComponents, TTyped, T } from 'reactxx-typings'
import { useStyles } from "reactxx-styles"
import { Text } from "reactxx-primitives"

interface ShapeLow extends TTyped.ShapeAncestor {
}

const { COMPONENT, STYLE } = getTypedEngine<ShapeLow>()

const $sheet = {
    root: STYLE<T>(
        {color: 'white'}
    ),
    Root: COMPONENT(Text, {
        root: {
            backgroundColor: 'red',
            width: 200,
            height: 100,
            textAlign: 'center',
            marginTop: 10
        }
    }, {
            singleLine: true
        })
}

interface Shape extends ShapeLow {
    sheet: typeof $sheet
}

const config: TComponents.ComponentConfig<Shape> = {
    displayName: 'styled-component',
    $sheet
}

const getExample: TComponents.GetComponent<Shape> = config => props => {

    const { classes } = useStyles<Shape>(props, config)

    return <>
        <classes.Root className={classes.root}>
            Hallo world, Hallo world, Hallo world
        </classes.Root>
        <classes.Root singleLine={false}>
            Hallo world, Hallo world, Hallo world
        </classes.Root>
    </>

}

const Example = getComponent(getExample, config)

const App = () => <>
    <Example/>
    <Example classes={{root: {color: 'yellow'}}}/>
</>

export default App
