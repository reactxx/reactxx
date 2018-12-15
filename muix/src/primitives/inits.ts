import { getComponentCreator } from "reactxx-styles"
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
    const viewCreator = getComponentCreator(getView, [viewConfig, {displayName: CompNames.View}], false)
    const View = viewCreator(/*userName, userConfig*/)

    const animatedViewCreator = getComponentCreator(getView, [viewConfig, {displayName: CompNames.AnimatedView}], true)
    const AnimatedView = animatedViewCreator()

    const iconCreator = getComponentCreator(getIcon, [iconConfig, {displayName: CompNames.Icon}], false)
    const Icon = iconCreator()

    const animatedIconCreator = getComponentCreator(getIcon, [iconConfig, {displayName: CompNames.AnimatedIcon}], true)
    const AnimatedIcon = animatedIconCreator()

    const textCreator = getComponentCreator(getText, [textConfig, {displayName: CompNames.Text}], false)
    const Text = textCreator()

    const animatedTextCreator = getComponentCreator(getText, [textConfig, {displayName: CompNames.AnimatedText}], true)
    const AnimatedText = animatedTextCreator()

    const scrollViewCreator = getComponentCreator(getScrollView, [scrollViewConfig, {displayName: CompNames.ScrollView}], false)
    const ScrollView = scrollViewCreator()

    const initPlatform = () => {
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
        initPlatform,
        viewCreator, View,
        scrollViewCreator, ScrollView,
        iconCreator, Icon,
        textCreator, Text,
        animatedViewCreator, AnimatedView,
        animatedIconCreator, AnimatedIcon,
        animatedTextCreator, AnimatedText,
    }
}