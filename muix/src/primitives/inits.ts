import { useSheeter, getComponentCreator } from "reactxx-use"
import { Platform, platform, resetPlatform } from 'reactxx-sheeter'
import { TUseSheeter } from 'reactxx-typings'

import { TPrimitives } from './shapes'
import { CompNames, textConfig, viewConfig, iconConfig, scrollViewConfig } from './configs'

export const inits = (
    getView: TUseSheeter.GetComponent<TPrimitives.ViewShape>,
    getIcon: TUseSheeter.GetComponent<TPrimitives.IconShape>,
    getText: TUseSheeter.GetComponent<TPrimitives.TextShape>,
    getScrollView: TUseSheeter.GetComponent<TPrimitives.ScrollViewShape>
) => {
    const viewCreator = getComponentCreator(CompNames.View, viewConfig, getView, false)
    const View = viewCreator()

    const animatedViewCreator = getComponentCreator(CompNames.AnimatedView, viewConfig, getView, true)
    const AnimatedView = animatedViewCreator()

    const initPrimitives = (force?: boolean) => {
        if (force) resetPlatform()
        if (platform.View) return
        const primitivies: Platform = {
            viewCreator, View, getView,
        }
        Object.assign(platform, primitivies)
    }

    return { initPrimitives, viewCreator, View }
}