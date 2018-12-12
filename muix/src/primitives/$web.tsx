import React from 'react'

import { TComponents } from "reactxx-typings"

import { hasPlatformEvents } from './configs'
import { TPrimitives } from './shapes'

export const getView: TComponents.GetComponent<TPrimitives.ViewShape> = (useStyles, isAnimated: boolean) => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { $rootWebProps, children } } = useStyles(props)

    propsCode.pressable = hasPlatformEvents($rootWebProps)
    return <div {...getRootWebStyleProps()} {...$rootWebProps} children={children} />
}

export const getText: TComponents.GetComponent<TPrimitives.TextShape> = (useStyles, isAnimated: boolean) => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { children, url, $rootWebProps } } = useStyles(props)

    propsCode.pressable = hasPlatformEvents($rootWebProps)

    const tagProps: React.HTMLAttributes<HTMLElement> = {
        ...getRootWebStyleProps(),
        ...$rootWebProps,
        onClick: url ? undefined : undefined /*onClick*/
    }

    tagProps.className += ' ' + TPrimitives.Consts.textClassName
    
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} children={children} />
}

export const getIcon: TComponents.GetComponent<TPrimitives.IconShape> = (useStyles, isAnimated: boolean) => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { data, url, children, $rootWebProps } } = useStyles(props)

    propsCode.pressable = hasPlatformEvents($rootWebProps)

    const svg = <svg
        {...getRootWebStyleProps()}
        {...$rootWebProps}
        onClick={url ? undefined : undefined /*onClick*/}>
        {data ? <path d={data} /> : children}
    </svg>
    
    return url ? <a href={url}>{svg}</a> : svg

}

export const getScrollView: TComponents.GetComponent<TPrimitives.ScrollViewShape> = (useStyles, isAnimated: boolean) => props => {

    const { getRootWebStyleProps, getWebStyleProps, propsCode: { horizontal, children, $rootWebProps }, classes } = useStyles(props)

    return <div {...getRootWebStyleProps()} {...$rootWebProps}>
        <div {...getWebStyleProps(classes.container)}>
            {children}
        </div>
    </div>
}
