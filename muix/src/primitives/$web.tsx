import React from 'react'

import { TComponents } from "reactxx-typings"
import { useStyles } from "reactxx-styles"

import { TPrimitives } from './shapes'
import {getWebEvents} from './events'

export const getView: TComponents.GetComponent<TPrimitives.ViewShape> = config => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { $rootWebProps, url, children } } = useStyles<TPrimitives.ViewShape>(props, config)

    const [hasEvent, events] = getWebEvents(props, url)
    propsCode.pressable = hasEvent

    return <div {...getRootWebStyleProps()} {...$rootWebProps} children={children} {...events} />
}

export const getText: TComponents.GetComponent<TPrimitives.TextShape> = config => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { children, url, $rootWebProps } } = useStyles<TPrimitives.TextShape>(props, config)

    const [hasEvent, events] = getWebEvents(props, url)
    propsCode.pressable = hasEvent
    
    const tagProps: React.HTMLAttributes<HTMLElement> = {
        ...getRootWebStyleProps(),
        ...$rootWebProps,
        ...events,
        children
    }

    tagProps.className += ' ' + TPrimitives.Consts.textClassName
    
    return url ? <a href={url} {...tagProps} /> : <div {...tagProps}/>
}

export const getIcon: TComponents.GetComponent<TPrimitives.IconShape> = config => props => {

    const { getRootWebStyleProps, propsCode, propsCode: { data, url, children, $rootWebProps } } = useStyles<TPrimitives.IconShape>(props, config)

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

export const getScrollView: TComponents.GetComponent<TPrimitives.ScrollViewShape> = config => props => {

    const { getRootWebStyleProps, getWebStyleProps, propsCode: { children, $rootWebProps }, classes } = useStyles<TPrimitives.ScrollViewShape>(props, config)

    return <div {...getRootWebStyleProps()} {...$rootWebProps}>
        <div {...getWebStyleProps(classes.container)}>
            {children}
        </div>
    </div>
}
