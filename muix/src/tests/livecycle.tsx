import React from 'react'

let ComponentCode: React.ComponentType
let ComponentInnerState: React.ComponentClass

type Pipe = (pilelineState, next: ReactNodeCreator) => ReactNodeCreator
type ReactNodeCreator = () => React.ReactNode

let pipes: Pipe[]

function createPipeline(pipes: Pipe[], pipelineState, lastPipeIdx = 0): ReactNodeCreator {
    if (lastPipeIdx >= pipes.length) return null
    return pipes[lastPipeIdx](pipelineState, createPipeline(pipes, pipelineState, lastPipeIdx + 1))
}

class Component extends React.Component {
    pipelineState
    pipeline = createPipeline(pipes, this.pipelineState)
    render() {
        const { pipelineState } = this

        // ********* themePipe
        // set pipelineState.theme
        // ####### LISTEN for theme change 
        //   => @@@@@@@ reacall all pipes below

        // set pipelineState.pipeStates[i] for default props and pipeStates[i+1] for component's props:
        // - call atomizeSheet and sheetFromThemeCache
        // - call atomizeRuleset and atomizeStyle

        // ********* custom pipes
        // ####### LISTEN: every pipe can change its pipeState's.innerState and 
        // - call refreshInnerStateComponent
        //   => @@@@@@@ InnerStateComponent's rerender
        // - call next()
        //   => @@@@@@@ reacall all pipes below this component

        // ********* widthsPipe custom pipe
        // - listen for window width change
        // - change innerState.$width
        // - call refreshInnerStateComponent

        // ********* prosCodePipe
        // merge pipeState's.codeProps: shallow merge of all props and its $web and $native parts
        // merge pipeState's.classNameX and classes: concat atomized ruleset arrays
        // merge pipeState's.styleX: 
        // - for native: concat atomized ruleset arrays
        // - for web: shallow merge of all rules and its $web part
        // call globalOptions.finalizePropsCode

        // ********* innerStatePipe
        // in InnerStateComponent.render: 
        // - call CodeComponent.modifyInnerState (e.g. set innerState.$switch conditions)
        // - merge pipeState's.innerState to propsCode.mergedInnerState
        // ####### LISTEN for setInnerState call (from component's code)
        //   => @@@@@@@ InnerStateComponent's rerender

        // ********* codePipe
        // in CodeComponent.render:
        // for every inner NON reactxx CodeComponent's comonent (web or native components): 
        // - call toClassNamesWithQuery (propsCode.mergedInnerState, <atomizedRuleset's >)
        //   - evaluate atomicRuleset's conditions
        //   - results to array of atomic values PLUS deffered part
        // - call overided React.createElement:
        //   - applyLastwinsStrategy (extract deffereds)
        //   - call globalOptions.processDeffereds => expand deffereds
        //   - call finalClassNameStep => returns web.className or native.style value

        return this.pipeline()
    }
}
