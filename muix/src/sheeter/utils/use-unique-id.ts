import React from 'react'

export const useUniqueId = (counterHolder?: { uniqueIdCounter?: number }) => {
    const uniqueId = React.useRef(0) // unique ID
    if (uniqueId.current) return uniqueId.current

    uniqueId.current = counterHolder ? ++counterHolder.uniqueIdCounter : ++uniqueIdCounter
    return uniqueId.current
}

let uniqueIdCounter = 0