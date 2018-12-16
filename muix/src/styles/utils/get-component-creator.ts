//import React from 'react'
import { TTyped, TComponents } from 'reactxx-typings';
import { useStyles } from 'reactxx-styles'

export const getComponentCreator = <R extends TTyped.Shape>(
    getComp: TComponents.GetComponent<R>, authorConfigs?: TComponents.ComponentConfigs<R>, par?
) => (
    userConfig?: TComponents.ComponentConfigs<R>
) => getComponent(getComp, [authorConfigs, userConfig], par)

export const getComponent = <R extends TTyped.Shape>(
    getComp: TComponents.GetComponent<R>, configss?: TComponents.ComponentConfigss<R>, par?
) => {
    const config = mergeConfig(configss)
    const _useStyles = (props: TComponents.Props<R>) => useStyles<R>(props, config)
    const Comp = getComp(_useStyles, par)
    Comp.displayName = config.displayName
    return Comp
}


const mergeConfig = <R extends TTyped.Shape>(inputss: TComponents.ComponentConfigss<R>, config?: TComponents.Config<R>) => {
    if (!config) config = {}
    if (!inputss) return config
    const doMerge = (input: TComponents.ComponentConfig) => {
        if (!input) return
        for (const p in input) {
            if (p.charAt(0) !== '$')
                config[p] = input[p]
            else {
                if (!config[p]) config[p] = []
                config[p].push(input[p])
            }
        }
    }
    if (Array.isArray(inputss))
        for (const inputs of inputss)
            if (Array.isArray(inputs))
                for (const input of inputs)
                    doMerge(input)
            else
                doMerge(inputs)
    else
        doMerge(inputss)
    return config
}

export const getComponentCreatorUntyped = (authorDisplayName, authorConfig, getComp, par?) =>
    getComponentCreator(getComp, authorConfig, par) as any

