import warning from 'warning'

import { TTyped, TComponents } from 'reactxx-typings';

export const getComponent = <R extends TTyped.Shape>(
    getComp: TComponents.GetComponent<R>, configss?: TComponents.ComponentConfigss<R>
) => {
    const config = mergeConfig(configss)
    config.getComponent = getComp

    const Comp = config.Comp = getComp(config)
    Comp.displayName = config.displayName
    Comp.config = config

    return Comp
}

export const getComponentUntyped = getComponent as any

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
