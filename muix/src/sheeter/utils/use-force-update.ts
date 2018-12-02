import React from 'react'

export const useForceUpdate = () => {
    const [, forceUpdate] = React.useState<null>(null)
    return forceUpdate as () => void
}
