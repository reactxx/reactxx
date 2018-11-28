import { useSheeter, getComponentCreator } from "reactxx-use"
import { Platform, platform, resetPlatform } from 'reactxx-sheeter'
import { TUseSheeter } from 'reactxx-typings'

import { TPrimitives } from './shapes'
import { textConfig, viewConfig, iconConfig, scrollViewConfig } from './configs'

const enum CompNames {
    Text = 'ReactXXText',
    View = 'ReactXXView',
    Icon = 'ReactXXIcon',
    ScrollView = 'ReactXXScrollView',

    AnimatedView = 'ReactXXAnimatedView',
    AnimatedIcon = 'ReactXXAnimatedIcon',
    AnimatedText = 'ReactXXAnimatedText',
    AnimatedScrollView = 'ReactXXAnimatedScrollView',
}

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

    const iconCreator = getComponentCreator(CompNames.Icon, iconConfig, getIcon, false)
    const Icon = iconCreator()

    const animatedIconCreator = getComponentCreator(CompNames.AnimatedIcon, iconConfig, getIcon, true)
    const AnimatedIcon = animatedIconCreator()

    const textCreator = getComponentCreator(CompNames.Text, textConfig, getText, false)
    const Text = textCreator()

    const animatedTextCreator = getComponentCreator(CompNames.AnimatedText, textConfig, getText, true)
    const AnimatedText = animatedTextCreator()

    const scrollViewCreator = getComponentCreator(CompNames.ScrollView, scrollViewConfig, getScrollView, false)
    const ScrollView = scrollViewCreator()

    const initPrimitives = (force?: boolean) => {
        if (force) resetPlatform()
        if (platform.View) return
        const primitivies: Platform = {
            viewCreator, View, getView,
            scrollViewCreator, ScrollView, getScrollView,
            iconCreator, Icon, getIcon,
            textCreator, Text, getText,
            animatedViewCreator, AnimatedView, 
            animatedIconCreator, AnimatedIcon, 
            animatedTextCreator, AnimatedText, 
        }
        Object.assign(platform, primitivies)
    }

    return {
        initPrimitives,
        viewCreator, View,
        scrollViewCreator, ScrollView,
        iconCreator, Icon,
        textCreator, Text,
        animatedViewCreator, AnimatedView, 
        animatedIconCreator, AnimatedIcon, 
        animatedTextCreator, AnimatedText, 
}
}