//import React from 'react'
import { TTyped, TComponents } from 'reactxx-typings';
import { platform, useStyles } from 'reactxx-styles'

export const getComponentCreator = <R extends TTyped.Shape>(
    getComp: TComponents.GetComponent<R>, authorDisplayName?: string, authorConfig?: TComponents.AuthorConfig<R>, par?
) => (
    userDisplayName?: string, userConfig?: TComponents.UserConfig<R>
) => {
        const config: TComponents.Config<R> = {
            componentId: ++platform._styles.componentIdCounter,
            displayName: userDisplayName || authorDisplayName || `Comp${platform._styles.componentIdCounter}`
        }
        const cfg = userConfig && authorConfig ? Object.assign({}, authorConfig, userConfig) : userConfig || authorConfig
        if (cfg) Object.assign(config, cfg)
        const _useStyles = (props: TComponents.Props<R>) => useStyles<R>(props, config)
        const Comp = getComp(_useStyles, par)
        Comp.displayName = config.displayName
        return Comp
    }

export const getComponentCreatorUntyped = (authorDisplayName, authorConfig, getComp, par?) =>
    getComponentCreator(getComp, authorDisplayName, authorConfig, par) as any

