import React from 'react'

import { TComponents } from "reactxx-typings"

import { TPrimitives } from './shapes'
import {getWebEvents} from './events'

export const getView: TComponents.GetComponent<TPrimitives.ViewShape> = (useStyles, isAnimated: boolean) => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { $rootWebProps, url, children } } = useStyles(props)

    const [hasEvent, events] = getWebEvents(props, url)
    propsCode.pressable = hasEvent

    return <div {...getRootWebStyleProps()} {...$rootWebProps} children={children} {...events} />
}

export const getText: TComponents.GetComponent<TPrimitives.TextShape> = (useStyles, isAnimated: boolean) => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { children, url, $rootWebProps } } = useStyles(props)

    const [hasEvent, events] = getWebEvents(props, url)
    propsCode.pressable = hasEvent
    
    const tagProps: React.HTMLAttributes<HTMLElement> = {
        ...getRootWebStyleProps(),
        ...$rootWebProps,
        ...events
    }

    tagProps.className += ' ' + TPrimitives.Consts.textClassName
    
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps} children={children} />
}

export const getIcon: TComponents.GetComponent<TPrimitives.IconShape> = (useStyles, isAnimated: boolean) => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { data, url, children, $rootWebProps } } = useStyles(props)

    const [hasEvent, events] = getWebEvents(props as any, url)
    propsCode.pressable = hasEvent
    
    const svg = <svg
        {...getRootWebStyleProps()}
        {...$rootWebProps}
        {...events}>
        {data ? <path d={data} /> : children}
    </svg>
    
    return url ? <a href={url}>{svg}</a> : svg

}

export const getScrollView: TComponents.GetComponent<TPrimitives.ScrollViewShape> = (useStyles, isAnimated: boolean) => props => {

    const { getRootWebStyleProps, getWebStyleProps, propsCode: { children, $rootWebProps }, classes } = useStyles(props)

    return <div {...getRootWebStyleProps()} {...$rootWebProps}>
        <div {...getWebStyleProps(classes.container)}>
            {children}
        </div>
    </div>
}
