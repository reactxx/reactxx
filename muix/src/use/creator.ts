import { platform, toClassNamesWithQuery, useForceUpdate, useUniqueId, useWidthsLow } from 'reactxx-sheeter';
import { TComponents, TTyped, TUseSheeter } from 'reactxx-typings';
import warning from 'warning';
import { useConfig } from './use-config';
import { useDefaults } from './use-defaults';
import { useProps } from './use-props';
import { useTheme } from './use-theme';

export const getComponentCreator = <R extends TTyped.Shape>(
    authorDisplayName: string, authorConfig: TUseSheeter.AuthorConfig<R>, getComp: TUseSheeter.GetComponent<R>, par?
) => (userDisplayName?: string, userConfig?: TUseSheeter.UserConfig<R>) => {
    const displayName = userDisplayName || authorDisplayName
    const Comp = getComp(authorConfig, displayName, userConfig, par)
    Comp.displayName = userDisplayName || authorDisplayName
    return Comp
}
