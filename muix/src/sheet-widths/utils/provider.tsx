import React from 'react'
import { subscribeWidthChange } from './subscribe'

import { platform } from '../index'

const context = React.createContext<number>(0)

export const Consumer = context.Consumer

export class WidthsProvider extends React.Component {
    state = { }
    unsubscribe: () => void
    constructor(props) {
        super(props)
        if (activeWidthsProvider) return
        activeWidthsProvider = this
        this.unsubscribe = subscribeWidthChange(() => {
            this.setState(st => st)
        })
    }
    render() {
        return activeWidthsProvider !== this
            ? <React.Fragment>{this.props.children}</React.Fragment>
            : <context.Provider value={platform.actWidth()}>{this.props.children}</context.Provider>

    }
    componentWillUnmount() {
        if (activeWidthsProvider !== this) return
        activeWidthsProvider = null
        this.unsubscribe()
    }
}
let forceRenderCount
// beware of only single active WidthsProvider component
let activeWidthsProvider: WidthsProvider

export const resetProvider = () => activeWidthsProvider = null