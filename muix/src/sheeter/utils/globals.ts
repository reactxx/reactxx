import { TExtensions, TEngine, TTyped } from 'reactxx-typings';
import { WidthStore } from '../queryable/$widths/store'

export interface Platform extends TExtensions.Platform {
    toPlatformAtomizeRuleset?: TEngine.ToPlatformAtomizeRuleset
    applyLastwinsStrategy?: TEngine.ApplyLastwinsStrategy
    finalizeClassName?: (values: TEngine.AtomicLow) => TEngine.AtomicFinal
    getDefaultTheme?: () => any
    styleProps?: TTyped.StyleProps
}

export const resetPlatform = () => {
    for (const p in platform) delete platform[p]
}

export const assignPlatform = (gl: Platform) => Object.assign(platform, gl)

export const platform: Platform = {}

export const initGlobals = (force: boolean, platformDependentInit: () => void) => {
    if (force) resetPlatform()
    if (platform._sheeter) return

    platform._sheeter = {}
    // fill e.g. actWidth
    platformDependentInit()
    // init store with act width
    platform._sheeter.widthsStore = new WidthStore()

}