import React from 'react'
import { TSheeter, TWithStyles } from 'reactxx-typings';
import { platform } from 'reactxx-sheeter'

export const useConfig = <R extends TSheeter.Shape = TSheeter.Shape>(
    configDefault: TWithStyles.ComponentConfig<R>,
    displayName?: string,
    configOverride?: TWithStyles.ComponentConfigOverride<R>
) => {

    if (!configDefault) throw 'Config expected'

    const useMemoCalled = React.useRef(false)

    const config = React.useMemo(() => {

        const { _withStyles } = platform

        // only single useMemo call allowed
        if (useMemoCalled.current)
            throw 'Some of configDefault, displayName or configOverride changed!'
        useMemoCalled.current = true

        if (configOverride) {
            if (configOverride.id) {// second configOverride
                if (configOverride.myConfigId !== configDefault.id) //  something wrong
                    throw 'configOverride.myConfigId !== configDefault.id'
            } else {// first configOverride
                configOverride.id = ++_withStyles.idCounter
                configOverride.displayName = displayName

                if (!configDefault.id) configDefault.id = ++_withStyles.idCounter
                configOverride.myConfigId = configDefault.id

                // keep configOverride pointer, change its content
                const value = Object.assign({}, configDefault, configOverride)
                Object.assign(configOverride, value)
            }
        } else {
            if (!configDefault.id) { // first configDefault ussage
                configDefault.displayName = displayName
                configDefault.id = ++_withStyles.idCounter
            }
        }

        return configOverride || configDefault

    }, [configDefault, displayName, configOverride])

    return config
}