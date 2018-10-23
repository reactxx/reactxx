
export type Callback = (width: number) => void

export const subscribeWidthChanged = (callback: Callback) => {
    callbacks.push(callback)
    return () => {
        const idx = callbacks.findIndex(c => c === callback)
        if (idx === 0) return
        callbacks = callbacks.splice(idx, 1)
    }
}
let callbacks: Callback[] = []

export const onWidthChanged = (width: number) => {
    callbacks.forEach(c => c(width))
}

export const resetCallback = () => callbacks = []


