import React from 'react'
import warning from 'warning'

import { platform } from 'reactxx-sheeter'

import { TTyped } from 'reactxx-typings';
import { TUseSheeter } from '../typings/use-sheeter'

export const useConfig = <R extends TTyped.Shape = TTyped.Shape>(
    authorConfig: TUseSheeter.AuthorConfig<R>,
    userConfig?: TUseSheeter.UserConfig<R>
) => {

    // configs check
    //if (!authorConfig)
        //throw 'authorConfig expected'

    const authorConfigRef = React.useRef(authorConfig)
    const userConfigRef = React.useRef(userConfig)
    if (authorConfigRef.current !== authorConfig || userConfigRef.current != userConfig)
        warning(false, 'authorConfig or userConfig changed. Last version will be ignored.')

    const { _withStyles } = platform

    if (authorConfig && !authorConfig.id)
        authorConfig.id = ++_withStyles.idCounter


    if (userConfig) {
        const authorConfigId = authorConfig ? authorConfig.id : -1
        if (!userConfig.id) { // first userConfigussage
            userConfig.id = ++_withStyles.idCounter
            userConfig.myAuthorConfigId = authorConfigId // connect it to authorConfig
            // config merging: keep userConfig pointer, change its content
            const value = Object.assign({}, authorConfig, userConfig)
            Object.assign(userConfig, value)
        } else if (userConfig.myAuthorConfigId != authorConfigId)
            warning(false, 'userConfig already inherited from different authorConfig. Last authorConfig ignored.')
    }

    return userConfig || authorConfig || {}
}