import { TTyped, TUseSheeter } from 'reactxx-typings';

export const getComponentCreator = <R extends TTyped.Shape>(
    authorDisplayName: string, authorConfig: TUseSheeter.AuthorConfig<R>, getComp: TUseSheeter.GetComponent<R>, par?
) => (userDisplayName?: string, userConfig?: TUseSheeter.UserConfig<R>) => {
    const displayName = userDisplayName || authorDisplayName
    const Comp = getComp(authorConfig, displayName, userConfig, par)
    Comp.displayName = userDisplayName || authorDisplayName
    return Comp
}
