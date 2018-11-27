import { TVariants } from 'reactxx-typings';
import { WidthStore } from '../queryable/$widths/store';

export const resetPlatform = () => {
    for (const p in platform) delete platform[p]
}

export const assignPlatform = (gl: TVariants.Platform) => Object.assign(platform, gl)

export const platform: TVariants.Platform = {}

export const initGlobals = (force: boolean, platformDependentInit: () => void) => {
    if (force) resetPlatform()
    if (platform._sheeter) return

    platform._sheeter = {}
    // fill e.g. actWidth
    platformDependentInit()
    // init store with act width
    platform._sheeter.widthsStore = new WidthStore()

}