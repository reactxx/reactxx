import React from 'react'

interface ActiveState {
    isActive?: boolean
    event?: React.MouseEvent
}
type UseActive = [ActiveState, React.MouseEventHandler<Element>, React.MouseEventHandler<Element>]

export const useActive = () => {

    const [activeState, setActiveState] = React.useState<ActiveState>({})

    const setActiveStateCreator = (isActive: boolean) => (event: React.MouseEvent) => {
        setActiveState({ isActive, event: {...event} })
    }

    return [activeState, setActiveStateCreator(true), setActiveStateCreator(false)] as UseActive
}

const ripple: React.SFC<{ activeState: ActiveState }> = ({ activeState: {isActive, event} }) => {
    const poseElement = React.useRef(null)
    React.useMemo(() => {
        if (!isActive) return
        // set div top, left, width, height
    }, [isActive])
    return <div ref={poseElement} data-pose={isActive ? 'opened' : 'closed'} />
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
