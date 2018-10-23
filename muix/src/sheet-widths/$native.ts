import { Dimensions } from 'react-native'
import { onWidthChanged, resetCallback } from './utils/subscribe'

import { platform } from 'reactxx-sheeter'
import { PlatformWidth } from './variants'

const pl = platform as PlatformWidth

pl.addBreakpoint = (width: number) => {}
pl.actWidth = () => Dimensions.get('window').width
pl.resetWidths = resetCallback // for jest test reset

Dimensions.addEventListener('change', arg => onWidthChanged(pl.actWidth()));

export let $nativeFake