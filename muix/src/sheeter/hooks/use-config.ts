import React from 'react'
import warning from 'warning'
import { TTyped, TUseSheeter } from 'reactxx-typings';
import { platform } from 'reactxx-styler'

export const useConfig = <R extends TTyped.Shape = TTyped.Shape>(
    authorConfig: TUseSheeter.AuthorConfig<R>,
    userConfig?: TUseSheeter.UserConfig<R>
) => {

    // configs check
    if (!authorConfig)
        throw 'authorConfig expected'

    const authorConfigRef = React.useRef(authorConfig)
    const userConfigRef = React.useRef(userConfig)
    if (authorConfigRef.current !== authorConfig || userConfigRef.current != userConfig)
        warning(false, 'authorConfig or userConfig changed. Last version will be ignored.')

    const { _withStyles } = platform

    if (!authorConfig.id)
        authorConfig.id = ++_withStyles.idCounter

    if (userConfig) {
        if (!userConfig.id) {
            userConfig.id = ++_withStyles.idCounter
            userConfig.myConfigId = authorConfig.id
            // keep userConfig pointer, change its content
            const value = Object.assign({}, authorConfig, userConfig)
            Object.assign(userConfig, value)
        } else if (userConfig.myConfigId != authorConfig.id)
            warning(false, 'userConfig already inherited from different authorConfig. Last authorConfig ignored.')
    }

    return userConfig || authorConfig
}