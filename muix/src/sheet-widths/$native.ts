import { Dimensions } from 'react-native'
import { onWidthChanged, resetCallback } from './utils/subscribe'
import {resetProvider} from './utils/provider'

import { platform } from 'reactxx-sheeter-native'

platform.addBreakpoint = (width: number) => {}
platform.actWidth = () => Dimensions.get('window').width
platform.resetWidths = () => {
    resetCallback() // for jest test reset
    resetProvider()
}

Dimensions.addEventListener('change', arg => onWidthChanged());

//export let $nativeFake