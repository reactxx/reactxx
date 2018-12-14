export * from './shapes'

import { initSheeter } from 'reactxx-styles'

import { getView, getIcon, getScrollView, getText } from './$native'
import { inits } from './inits'

const {
    initPlatform,
    viewCreator, View,
    scrollViewCreator, ScrollView,
    iconCreator, Icon,
    textCreator, Text,
} = inits(getView, getIcon, getText, getScrollView)

export {
    viewCreator, View, getView,
    scrollViewCreator, ScrollView, getScrollView,
    iconCreator, Icon, getIcon,
    textCreator, Text, getText,
}

export const initPrimitives$Native = initPlatform

export const initPrimitives = (trace: Trace = {}) => {
    initSheeter(trace)
    initPlatform()
}

