import React from 'react'

import { getTypedEngine, getComponent } from 'reactxx-styles'
import { TComponents, TTyped, T } from 'reactxx-typings'
import { useStyles } from "reactxx-styles"
import { Text } from "reactxx-primitives"

interface ShapeLow extends TTyped.ShapeAncestor {
}

const { COMPONENT } = getTypedEngine<ShapeLow>()

const $sheet = {
    Root: COMPONENT(Text, {
        root: {
            backgroundColor: 'red',
            width: 200,
            height: 100,
        }
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

    return <classes.Root>
        Hallo world
    </classes.Root>

}

const Example = getComponent(getExample, config)

export default Example
