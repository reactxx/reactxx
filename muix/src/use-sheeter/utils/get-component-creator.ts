//import React from 'react'
import { TTyped } from 'reactxx-typings';

import { TUseSheeter } from '../typings/use-sheeter'


export const getComponentCreator = <R extends TTyped.Shape>(
    authorDisplayName: string, authorConfig: TUseSheeter.AuthorConfig<R>, getComp: TUseSheeter.GetComponent<R>, par?
) => (userDisplayName?: string, userConfig?: TUseSheeter.UserConfig<R>) => {
    const displayName = userDisplayName || authorDisplayName
    const Comp = getComp(authorConfig, displayName, userConfig, par)
    Comp.displayName = displayName
    //Comp.$c$ = true
    return Comp
}

export const getComponentCreatorUntyped = (authorDisplayName, authorConfig, getComp, par?) =>
    getComponentCreator(authorDisplayName, authorConfig, getComp, par) as any