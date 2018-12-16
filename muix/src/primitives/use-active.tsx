import React from 'react'

export interface ActiveState {
    isActive?: boolean
    event?: React.MouseEvent<HTMLElement>
}
export type UseActive = [ActiveState, React.MouseEventHandler<Element>, React.MouseEventHandler<Element>]

export const useActive = () => {

    const [activeState, setActiveState] = React.useState<ActiveState>({})

    const setActiveStateCreator = (isActive: boolean) => (event: React.MouseEvent<HTMLElement>) =>
        setActiveState({ isActive, event: { ...event } })

    return [activeState, setActiveStateCreator(true), setActiveStateCreator(false)] as UseActive
}