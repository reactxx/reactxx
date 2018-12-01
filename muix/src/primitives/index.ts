export * from './shapes'

import { getView, getIcon, getScrollView, getText } from './$web'
import { inits } from './inits'
import './configs'

const {
    initPrimitives,
    viewCreator, View,
    scrollViewCreator, ScrollView,
    iconCreator, Icon,
    textCreator, Text,
    animatedViewCreator, AnimatedView, 
    animatedIconCreator, AnimatedIcon, 
    animatedTextCreator, AnimatedText, 
} = inits(getView, getIcon, getText, getScrollView)

export {
    initPrimitives,
    viewCreator, View, getView,
    scrollViewCreator, ScrollView, getScrollView,
    iconCreator, Icon, getIcon,
    textCreator, Text, getText,
    animatedViewCreator, AnimatedView, 
    animatedIconCreator, AnimatedIcon, 
    animatedTextCreator, AnimatedText, 
}
export const initPrimitives$Web = initPrimitives
