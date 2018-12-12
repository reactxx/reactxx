import React from 'react'
import warning from 'warning'

import { platform } from 'reactxx-styles'

import { TTyped, TComponents } from 'reactxx-typings';

export const useConfig = <R extends TTyped.Shape = TTyped.Shape>(
    authorConfig: TComponents.AuthorConfig<R>,
    userConfig?: TComponents.UserConfig<R>
) => {

    const authorConfigRef = React.useRef(authorConfig)
    const userConfigRef = React.useRef(userConfig)
    if (authorConfigRef.current !== authorConfig || userConfigRef.current != userConfig)
        warning(false, 'authorConfig or userConfig changed. Last version will be ignored.')

    const { _styles } = platform

    if (authorConfig && !authorConfig.componentId)
        authorConfig.componentId = ++_styles.componentIdCounter

    if (userConfig) {
        const authorConfigId = authorConfig ? authorConfig.componentId : -1
        if (!userConfig.componentId) { // first userConfig ussage
            userConfig.componentId = ++_styles.componentIdCounter
            userConfig.myAuthorConfigId = authorConfigId // connect it to authorConfig
            // config merging: keep userConfig pointer, change its content
            const value = Object.assign({}, authorConfig, userConfig)
            Object.assign(userConfig, value)
        } else if (userConfig.myAuthorConfigId != authorConfigId)
            warning(false, 'userConfig already inherited from different authorConfig. Last authorConfig inheritance ignored.')
    }

    return (userConfig || authorConfig || {}) as TComponents.Config<R>
}