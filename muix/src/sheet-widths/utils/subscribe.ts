
export type Callback = () => void

export const subscribeWidthChange = (callback: Callback) => {
    callbacks.push(callback)
    return () => {
        const idx = callbacks.findIndex(c => c === callback)
        if (idx === 0) return
        callbacks = callbacks.splice(idx, 1)
    }
}
let callbacks: Callback[] = []

export const onWidthChanged = () => callbacks.forEach(c => {
    c()
})

export const resetCallback = () => callbacks = []


