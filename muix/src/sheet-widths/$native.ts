import { Dimensions } from 'react-native'
import { onWidthChanged, resetCallback } from './utils/subscribe'
import {resetProvider} from './utils/provider'

import { platform as p } from 'reactxx-sheeter'
import { PlatformWidth } from './variants'
const platform = p as PlatformWidth

platform.addBreakpoint = (width: number) => {}
platform.actWidth = () => Dimensions.get('window').width
platform.resetWidths = () => {
    resetCallback() // for jest test reset
    resetProvider()
}

Dimensions.addEventListener('change', arg => onWidthChanged());

export let $nativeFake