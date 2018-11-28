export * from './shapes'

import { getView, getIcon, getScrollView, getText } from './$web'
import { inits } from './inits'

const {
    initPrimitives,
    viewCreator, View,
    scrollViewCreator, ScrollView,
    iconCreator, Icon,
    textCreator, Text,
} = inits(getView, getIcon, getScrollView, getText)

export {
    initPrimitives,
    viewCreator, View, getView,
    scrollViewCreator, ScrollView, getScrollView,
    iconCreator, Icon, getIcon,
    textCreator, Text, getText,
}
export const initPrimitives$Web = initPrimitives
