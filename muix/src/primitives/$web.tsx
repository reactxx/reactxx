/** @jsx platform.createElement */

import { platform } from 'reactxx-sheeter'
import { TUseSheeter } from 'reactxx-typings'
import { useSheeter } from "reactxx-use-sheeter"

import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TUseSheeter.GetComponent<TPrimitives.ViewShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode, classes, classNameX, styleX, $sheetQuery }
        = useSheeter<TPrimitives.ViewShape>(props, authorConfig, displayName, userConfig)
    $sheetQuery.pressable = hasPlatformEvents(props)
    return <div classNameX={toClassNames(classes.root, classNameX)} styleX={styleX} {...propsCode} />
}

export const getIcon: TUseSheeter.GetComponent<TPrimitives.IconShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode: { data, url, children, ...rest }, classes, classNameX, styleX, $sheetQuery }
        = useSheeter<TPrimitives.IconShape>(props, authorConfig, displayName, userConfig)
    $sheetQuery.pressable = hasPlatformEvents(rest)
    const svg = <svg
        classNameX={toClassNames(classes.root, classNameX)}
        styleX={styleX}
        onClick={url ? undefined : undefined /*onClick*/} {...rest}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg

}
export const getText: TUseSheeter.GetComponent<TPrimitives.TextShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode: { singleLine, url, ...rest }, classes, classNameX, styleX, $sheetQuery }
        = useSheeter<TPrimitives.TextShape>(props, authorConfig, displayName, userConfig)
    $sheetQuery.pressable = hasPlatformEvents(rest)
    const tagProps = {
        className: TPrimitives.Consts.textClassName,
        classNameX: toClassNames(classes.root, classNameX),
        styleX,
        ...rest,
        onClick: url ? undefined : undefined /*onClick*/
    }
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}
export const getScrollView: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape> =
    (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
        const { toClassNames, propsCode: { horizontal, children, ...rest }, classes, classNameX, styleX }
            = useSheeter<TPrimitives.ScrollViewShape>(props, authorConfig, displayName, userConfig)
        return <div classNameX={toClassNames(classes.root, classNameX)} styleX={styleX} {...rest}>
            <div classNameX={toClassNames(classes.container)}>
                {children}
            </div>
        </div>
    }
