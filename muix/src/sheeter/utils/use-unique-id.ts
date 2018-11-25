import React from 'react'

export const useUniqueId = (counterHolder?: { uniqueIdCounter?: number }) => {
    const uniqueId = React.useRef(0) // unique ID
    counterHolder && !counterHolder.uniqueIdCounter && (counterHolder.uniqueIdCounter = 0)
    return uniqueId.current = counterHolder ? ++counterHolder.uniqueIdCounter : ++uniqueIdCounter
}

let uniqueIdCounter = 0