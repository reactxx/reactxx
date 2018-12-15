//import React from 'react'
import { TTyped, TComponents } from 'reactxx-typings';
import { useStyles } from 'reactxx-styles'

export const getComponentCreator = <R extends TTyped.Shape>(
    getComp: TComponents.GetComponent<R>, authorConfigs?: TComponents.ComponentConfigs<R>, par?
) => (
    userConfig?: TComponents.ComponentConfigs<R>
) => {
        const config = mergeConfigs([
            ...Array.isArray(authorConfigs) ? authorConfigs : [authorConfigs],
            ...Array.isArray(userConfig) ? userConfig : [userConfig],
        ])

        const _useStyles = (props: TComponents.Props<R>) => useStyles<R>(props, config)
        const Comp = getComp(_useStyles, par)
        Comp.displayName = config.displayName
        return Comp
    }

export const mergeConfig = <R extends TTyped.Shape>(input: TComponents.ComponentConfig<R>, config?: TComponents.Config<R>) => {
    if (!config) config = {}
    if (!input) return config
    for (const p in input) {
        if (p.charAt(0) !== '$')
            config[p] = input[p]
        else {
            if (!config[p]) config[p] = []
            config[p].push(input[p])
        }
    }
    return config
}

const mergeConfigs = <R extends TTyped.Shape>(inputs: TComponents.ComponentConfig<R>[]) => {
    const config:TComponents.Config<R> = {}
    for (const input of inputs) input && mergeConfig(input, config)
    return config
}

export const getComponent = <R extends TTyped.Shape>(
    getComp: TComponents.GetComponent<R>, input?: TComponents.ComponentConfig<R>, par?
) => {
    const config = mergeConfig(input)
    const _useStyles = (props: TComponents.Props<R>) => useStyles<R>(props, config)
    const Comp = getComp(_useStyles, par)
    Comp.displayName = config.displayName
    return Comp
}

export const getComponentCreatorUntyped = (authorDisplayName, authorConfig, getComp, par?) =>
    getComponentCreator(getComp, authorConfig, par) as any

