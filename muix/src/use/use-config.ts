import React from 'react'
import warning from 'warning'
import { TTyped, TUseSheeter } from 'reactxx-typings';
import { platform } from 'reactxx-sheeter'

export const useConfig = <R extends TTyped.Shape = TTyped.Shape>(
    configDefault: TUseSheeter.AuthorConfig<R>,
    configOverride?: TUseSheeter.UserConfig<R>
) => {

    if (!configDefault)
        throw 'ConfigDefault expected'

    const useMemoCalled = React.useRef(false)

    const config = React.useMemo(() => {

        // only single useMemo call allowed
        if (useMemoCalled.current) {
            warning(false, 'ConfigDefault or configOverride changed! New value will be ignored.')
            return
        }
        useMemoCalled.current = true

        const { _withStyles } = platform

        if (!configDefault.id)
            configDefault.id = ++_withStyles.idCounter

        if (configOverride) {
            if (!configOverride.id) {
                configOverride.id = ++_withStyles.idCounter
                configOverride.myConfigId = configDefault.id
                // keep configOverride pointer, change its content
                const value = Object.assign({}, configDefault, configOverride)
                Object.assign(configOverride, value)
            } else if (configOverride.myConfigId != configDefault.id)
                throw 'configOverride already inherited from another configDefault'
        }

        return configOverride || configDefault

    }, [configDefault, configOverride])

    return config
}