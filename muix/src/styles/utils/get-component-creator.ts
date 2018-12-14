//import React from 'react'
import { TTyped, TComponents } from 'reactxx-typings';
import { useStyles } from 'reactxx-styles'

export const getComponentCreator = <R extends TTyped.Shape>(
    getComp: TComponents.GetComponent<R>, authorDisplayName?: string, authorConfig?: TComponents.ComponentConfig<R>, par?
) => (
    userDisplayName?: string, userConfig?: TComponents.ComponentConfig<R>
) => {
        const config: TComponents.Config<R> = {
            displayName: userDisplayName || authorDisplayName,
            props:[null, null],
            sheet:[null, null]
            //componentId: platform is not initialized yet, fill during first ussage
        }
        if (authorConfig) {
            const {props, sheet,...rest} = authorConfig
            config.props[0] = props
            config.sheet[0] = sheet
            Object.assign(config, rest)
        }
        if (userConfig) {
            const {props, sheet,...rest} = userConfig
            config.props[1] = props
            config.sheet[1] = sheet
            Object.assign(config, rest)
        }
        const _useStyles = (props: TComponents.Props<R>) => useStyles<R>(props, config)
        const Comp = getComp(_useStyles, par)
        Comp.displayName = config.displayName
        return Comp
    }

export const getComponentCreatorUntyped = (authorDisplayName, authorConfig, getComp, par?) =>
    getComponentCreator(getComp, authorDisplayName, authorConfig, par) as any

