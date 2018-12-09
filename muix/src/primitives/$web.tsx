/** @jsx platform.createElement */

import { platform } from 'reactxx-sheeter'
import { useSheeter, TUseSheeter, TComponents } from "reactxx-use-sheeter"

import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TUseSheeter.GetComponent<TPrimitives.ViewShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode, propsCode: { $rootWebProps, children }, classes, classNames, styles }
        = useSheeter<TPrimitives.ViewShape>(props, authorConfig, displayName, userConfig)
    propsCode.pressable = hasPlatformEvents($rootWebProps)
    return <div classNames={toClassNames(classes.root, classNames)} styles={styles} {...$rootWebProps} children={children} />
}

export const getIcon: TUseSheeter.GetComponent<TPrimitives.IconShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode, propsCode: { data, url, children, $rootWebProps }, classes, classNames, styles }
        = useSheeter<TPrimitives.IconShape>(props, authorConfig, displayName, userConfig)
    propsCode.pressable = hasPlatformEvents($rootWebProps)
    const svg = <svg
        classNames={toClassNames(classes.root, classNames)}
        styles={styles}
        onClick={url ? undefined : undefined /*onClick*/}
        {...$rootWebProps}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg

}

export const getText: TUseSheeter.GetComponent<TPrimitives.TextShape> = (
    authorConfig, displayName, userConfig, isAnimated: boolean
) => props => {
    const { toClassNames, propsCode, propsCode: { children, url, $rootWebProps }, classes, classNames, styles }
        = useSheeter<TPrimitives.TextShape>(props, authorConfig, displayName, userConfig)
    propsCode.pressable = hasPlatformEvents($rootWebProps)
    const tagProps: React.HTMLAttributes<HTMLElement> = {
        className: TPrimitives.Consts.textClassName, // HACK
        classNames: toClassNames(classes.root, classNames),
        styles,
        ...$rootWebProps,
        onClick: url ? undefined : undefined /*onClick*/
    }
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} children={children} />
}

export const getScrollView: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape> =
    (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
        const { toClassNames, propsCode: { horizontal, children, $rootWebProps }, classes, classNames, styles }
            = useSheeter<TPrimitives.ScrollViewShape>(props, authorConfig, displayName, userConfig)
        return <div classNames={toClassNames(classes.root, classNames)} styles={styles} {...$rootWebProps}>
            <div classNames={toClassNames(classes.container)}>
                {children}
            </div>
        </div>
    }
