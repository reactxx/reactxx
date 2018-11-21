import { Dimensions } from 'react-native'
import { onWidthChanged } from './utils/subscribe'

import { assignPlatform } from 'reactxx-sheeter'

export const init = () => {
    assignPlatform({
        addBreakpoint: (width: number) => { },
        actWidth: () => Dimensions.get('window').width,
    })
}

if (Dimensions) Dimensions.addEventListener('change', arg => onWidthChanged())
