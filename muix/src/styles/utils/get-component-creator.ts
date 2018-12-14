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
            sheet:[null, null],
            pose:[null, null]
            //componentId: platform is not initialized yet, fill during first ussage
        }

        const addCfg = (cfg: TComponents.ComponentConfig<R>, idx: number) => {
            if (!cfg) return
            const {props, sheet, pose, ...rest} = cfg
            config.props[idx] = props
            config.sheet[idx] = sheet
            config.pose[idx] = pose
            Object.assign(config, rest)
        }
        addCfg(authorConfig, 0)
        addCfg(userConfig, 1)

        const _useStyles = (props: TComponents.Props<R>) => useStyles<R>(props, config)
        const Comp = getComp(_useStyles, par)
        Comp.displayName = config.displayName
        return Comp
    }

export const getComponentCreatorUntyped = (authorDisplayName, authorConfig, getComp, par?) =>
    getComponentCreator(getComp, authorDisplayName, authorConfig, par) as any

