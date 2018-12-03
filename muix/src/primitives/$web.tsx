/** @jsx platform.createElement */

import { platform } from 'reactxx-sheeter'
import { useSheeter, TUseSheeter, TComponents } from "reactxx-use-sheeter"

import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TUseSheeter.GetComponent<TPrimitives.ViewShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode, classes, css, styles, $sheetQuery }
        = useSheeter<TPrimitives.ViewShape>(props, authorConfig, displayName, userConfig)
    $sheetQuery.pressable = hasPlatformEvents(props)
    //const root = useCSS(classes.root, css, [classes.root, css, $sheetQuery.pressable, ])
    return <div css={toClassNames(classes.root, css)} styles={styles} {...propsCode} />
}

export const getIcon: TUseSheeter.GetComponent<TPrimitives.IconShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode: { data, url, children, ...rest }, classes, css, styles, $sheetQuery }
        = useSheeter<TPrimitives.IconShape>(props, authorConfig, displayName, userConfig)
    $sheetQuery.pressable = hasPlatformEvents(rest)
    const svg = <svg
        css={toClassNames(classes.root, css)}
        styles={styles}
        onClick={url ? undefined : undefined /*onClick*/} {...rest}>
        {data ? <path d={data} /> : children}
    </svg>
    return url ? <a href={url}>{svg}</a> : svg

}
export const getText: TUseSheeter.GetComponent<TPrimitives.TextShape> = (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
    const { toClassNames, propsCode: { singleLine, url, ...rest }, classes, css, styles, $sheetQuery }
        = useSheeter<TPrimitives.TextShape>(props, authorConfig, displayName, userConfig)
    $sheetQuery.pressable = hasPlatformEvents(rest)
    const tagProps: React.HTMLAttributes<HTMLElement> = {
        className: TPrimitives.Consts.textClassName,
        css: toClassNames(classes.root, css),
        styles,
        ...rest,
        onClick: url ? undefined : undefined /*onClick*/
    }
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} />
}
export const getScrollView: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape> =
    (authorConfig, displayName, userConfig, isAnimated: boolean) => props => {
        const { toClassNames, propsCode: { horizontal, children, ...rest }, classes, css, styles }
            = useSheeter<TPrimitives.ScrollViewShape>(props, authorConfig, displayName, userConfig)
        return <div css={toClassNames(classes.root, css)} styles={styles} {...rest}>
            <div css={toClassNames(classes.container)}>
                {children}
            </div>
        </div>
    }
