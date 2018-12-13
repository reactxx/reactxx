import { getComponentCreator } from "reactxx-styles"
import { Platform, platform, resetPlatform } from 'reactxx-styles'
import { TComponents } from 'reactxx-typings'

import { TPrimitives } from './shapes'
import { textConfig, viewConfig, iconConfig, scrollViewConfig } from './configs'

const enum CompNames {
    Text = 'reactxx-text',
    View = 'reactxx-view',
    Icon = 'reactxx-icon',
    ScrollView = 'reactxx-scrollview',

    AnimatedView = 'reactxx-animatedview',
    AnimatedIcon = 'reactxx-animatedicon',
    AnimatedText = 'reactxx-animatedtext',
    AnimatedScrollView = 'reactxx-animatedscrollview',
}

export const inits = (
    getView: TComponents.GetComponent<TPrimitives.ViewShape>,
    getIcon: TComponents.GetComponent<TPrimitives.IconShape>,
    getText: TComponents.GetComponent<TPrimitives.TextShape>,
    getScrollView: TComponents.GetComponent<TPrimitives.ScrollViewShape>
) => {
    const viewCreator = getComponentCreator(getView, CompNames.View, viewConfig, false)
    const View = viewCreator(/*userName, userConfig*/)

    const animatedViewCreator = getComponentCreator(getView, CompNames.AnimatedView, viewConfig, true)
    const AnimatedView = animatedViewCreator()

    const iconCreator = getComponentCreator(getIcon, CompNames.Icon, iconConfig, false)
    const Icon = iconCreator()

    const animatedIconCreator = getComponentCreator(getIcon, CompNames.AnimatedIcon, iconConfig, true)
    const AnimatedIcon = animatedIconCreator()

    const textCreator = getComponentCreator(getText, CompNames.Text, textConfig, false)
    const Text = textCreator()

    const animatedTextCreator = getComponentCreator(getText, CompNames.AnimatedText, textConfig, true)
    const AnimatedText = animatedTextCreator()

    const scrollViewCreator = getComponentCreator(getScrollView, CompNames.ScrollView, scrollViewConfig, false)
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