import React from 'react'

import { platform } from 'reactxx-sheeter'
import { useSheeter, TUseSheeter } from "reactxx-use-sheeter"

import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TUseSheeter.GetComponent<TPrimitives.ViewShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { styleRootWeb, propsCode, propsCode: { $rootWebProps, children }, classes }
        = useSheeter<TPrimitives.ViewShape>(props, authorConfig, displayName, userConfig)
    propsCode.pressable = hasPlatformEvents($rootWebProps)
    return <div {...styleRootWeb()} {...$rootWebProps} children={children} />
}

export const getIcon: TUseSheeter.GetComponent<TPrimitives.IconShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { styleRootWeb, propsCode, propsCode: { data, url, children, $rootWebProps }, classes }
        = useSheeter<TPrimitives.IconShape>(props, authorConfig, displayName, userConfig)
    propsCode.pressable = hasPlatformEvents($rootWebProps)
    const svg = <svg
        {...styleRootWeb()}
        onClick={url ? undefined : undefined /*onClick*/}
        {...$rootWebProps}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg

}

export const getText: TUseSheeter.GetComponent<TPrimitives.TextShape> = (
    authorConfig, displayName, userConfig, isAnimated: boolean
) => props => {
    const { styleRootWeb, propsCode, propsCode: { children, url, $rootWebProps }, classes }
        = useSheeter<TPrimitives.TextShape>(props, authorConfig, displayName, userConfig)
    propsCode.pressable = hasPlatformEvents($rootWebProps)
    const tagProps: React.HTMLAttributes<HTMLElement> = {
        //className: TPrimitives.Consts.textClassName, // HACK
        ...styleRootWeb(),
        ...$rootWebProps,
        onClick: url ? undefined : undefined /*onClick*/
    }
    tagProps.className = TPrimitives.Consts.textClassName + ' ' + tagProps.className
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} children={children} />
}

export const getScrollView: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape> =
    (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
        const { styleRootWeb, styleWeb, propsCode: { horizontal, children, $rootWebProps }, classes }
            = useSheeter<TPrimitives.ScrollViewShape>(props, authorConfig, displayName, userConfig)
        return <div {...styleRootWeb()} {...$rootWebProps}>
            <div {...styleWeb(classes.container)}>
                {children}
            </div>
        </div>
    }
