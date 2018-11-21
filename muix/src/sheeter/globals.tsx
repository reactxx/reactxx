import { TVariants } from 'reactxx-typings'

export const resetPlatform = () => {
    for (const p in platform) delete platform[p]
}

export const assignPlatform = (gl: TVariants.Platform) => Object.assign(platform, gl)

export const platform: TVariants.Platform = {}

export const initGlobals = (force: boolean, platformDependentInit: () => void) => {
    if (force) resetPlatform()
    if (platform._sheeter) return
    platform._sheeter = true
        // variantHandlers: [],
        // variantHandlersDir: {}
    //}
    platformDependentInit()
}