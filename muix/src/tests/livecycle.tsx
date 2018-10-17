import React from 'react'

let ComponentCode: React.ComponentType
let ComponentInnerState: React.ComponentClass

type Pipe = (pilelineState, next: ReactNodeCreator) => ReactNodeCreator
type ReactNodeCreator = () => React.ReactNode

let pipes: Pipe[]

function createPipeline (pipes: Pipe[], pipelineState, lastPipeIdx = 0): ReactNodeCreator {
    if (lastPipeIdx >= pipes.length) return null
    return pipes[lastPipeIdx](pipelineState, createPipeline(pipes, pipelineState, lastPipeIdx + 1))
}

class Component extends React.Component {
    pipelineState
    pipeline = createPipeline(pipes, this.pipelineState)
    render() {
        return this.pipeline()
    }
}
