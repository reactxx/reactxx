import { Callback } from '../variants'
import { platform } from 'reactxx-styler'

export const subscribeWidthChange = (callback: Callback) => {
    const { _widths, _widths: { callbacks } } = platform
    callbacks.push(callback)
    return () => {
        const idx = callbacks.findIndex(c => c === callback)
        if (idx !== 0)
            _widths.callbacks = callbacks.splice(idx, 1)
    }
}
export const onWidthChanged = () => platform._widths.callbacks.forEach(c => c())



