import React from 'react'

interface ActiveState {
    isActive?: boolean
    event?: React.MouseEvent
}
type SetActiveState = (isActive: boolean) => (event: React.MouseEvent) => void
type UseActive = [ActiveState, React.MouseEventHandler<Element>, React.MouseEventHandler<Element>]

export const useActive = () => {
    const [activeStateLow, setActiveStateLow] = React.useState<ActiveState>({})
    const { isActive, event } = activeStateLow

    // usePrevious
    const oldIsActive = React.useRef(false)
    React.useEffect(() => { oldIsActive.current = isActive })

    const activeState: ActiveState = {
        isActive,
        event: oldIsActive.current === isActive ? null : event // event is valid only for just changed active state
    }
    const setActiveState = (isActive: boolean) => (event: React.MouseEvent) => {
        setActiveStateLow({ isActive, event: {...event} })
    }

    return [activeState, setActiveState(true), setActiveState(false)] as UseActive
}

const ripple: React.SFC<{ activeState: ActiveState }> = ({ activeState: { isActive, event } }) => {
    if (isActive && event) {
        // set div top, left, width, height
    }
    return <div data-pose={isActive ? 'opened' : 'closed'} />
}
const Ripple = React.memo(ripple)

const Comp: React.SFC = () => {
    const [activeState, activeStart, activeEnd] = useActive()

    return <div
        onMouseDown={activeStart}
        onMouseUp={activeEnd}
    >
        <Ripple activeState={activeState} />
    </div>
}
