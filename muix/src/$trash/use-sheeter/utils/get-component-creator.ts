//import React from 'react'
import { TTyped, TComponents } from 'reactxx-typings';

export const getComponentCreator = <R extends TTyped.Shape>(
    authorDisplayName: string, authorConfig: TComponents.AuthorConfig<R>, getComp: TComponents.GetComponent<R>, par?
) => (userDisplayName?: string, userConfig?: TComponents.UserConfig<R>) => {
    const displayName = userDisplayName || authorDisplayName
    const Comp = getComp(authorConfig, displayName, userConfig, par)
    Comp.displayName = displayName
    //Comp.$c$ = true
    return Comp
}

export const getComponentCreatorUntyped = (authorDisplayName, authorConfig, getComp, par?) =>
    getComponentCreator(authorDisplayName, authorConfig, getComp, par) as any