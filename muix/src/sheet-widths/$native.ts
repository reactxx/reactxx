import { Dimensions } from 'react-native'
import { onWidthChanged } from './utils/subscribe'

export const addBreakpoint = (width: number) => {}
export const actWidth = () => Dimensions.get('window').width

Dimensions.addEventListener('change', arg => onWidthChanged(actWidth()))
