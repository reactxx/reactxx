import { getComponent } from "reactxx-styles"
import { Platform, platform } from 'reactxx-styles'
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
    const View = getComponent(getView, [viewConfig, { displayName: CompNames.View }])
    const AnimatedView = getComponent(getView, [viewConfig, { displayName: CompNames.AnimatedView, isAnimated: true }])
    const Icon = getComponent(getIcon, [iconConfig, { displayName: CompNames.Icon }])
    const AnimatedIcon = getComponent(getIcon, [iconConfig, { displayName: CompNames.AnimatedIcon, isAnimated: true }])
    const Text = getComponent(getText, [textConfig, { displayName: CompNames.Text }])
    const AnimatedText = getComponent(getText, [textConfig, { displayName: CompNames.AnimatedText, isAnimated: true }])
    const ScrollView = getComponent(getScrollView, [scrollViewConfig, { displayName: CompNames.ScrollView }])

    const initPlatform = () => {
        if (platform.View) return
        const primitivies: Platform = {
            View, ScrollView, Icon, Text, AnimatedView, AnimatedIcon, AnimatedText,
        }
        Object.assign(platform, primitivies)
    }

    return {
        initPlatform,
        View, ScrollView, Icon, Text, AnimatedView, AnimatedIcon, AnimatedText,
    }
}