import { TExtensions, TEngine, TTyped } from 'reactxx-typings';
import { WidthStore } from '../queryable/$widths/store'

export interface Platform extends TExtensions.Platform {
    toPlatformAtomizeRuleset?: TEngine.ToPlatformAtomizeRuleset
    applyLastwinsStrategy?: TEngine.ApplyLastwinsStrategy
    finalizeClassName?: (values: TEngine.AtomicLow) => TEngine.AtomicFinal
    getDefaultTheme?: () => any
    getStyleProps?: TTyped.StyleProps
}

export const resetPlatform = () => {
    for (const p in platform) delete platform[p]
}

export const assignPlatform = (gl: Platform) => Object.assign(platform, gl)

export const platform: Platform = {}

export const initGlobals = (trace: Trace = {}, force: boolean, platformDependentInit: () => void) => {
    if (force) resetPlatform()
    window.__TRACE__ = trace
    if (platform._styles) return

    platform._styles = {
        $cache: {},
        defaultTheme: platform.getDefaultTheme && platform.getDefaultTheme(),
        instanceIdCounter: 0,
        componentIdCounter: 0,
    }
    // fill e.g. actWidth
    platformDependentInit()
    // init store with act width
    platform._styles.widthsStore = new WidthStore()
}