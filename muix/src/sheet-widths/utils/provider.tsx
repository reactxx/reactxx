import React from 'react'
import { platform } from 'reactxx-sheeter'

import { subscribeWidthChange } from './subscribe'

const context = React.createContext<number>(0)

export const Consumer = context.Consumer

export class WidthsProvider extends React.Component {
    state = {}
    unsubscribe: () => void
    constructor(props) {
        super(props)
        const { _widths } = platform
        if (_widths.activeWidthsProvider) return
        _widths.activeWidthsProvider = this
        this.unsubscribe = subscribeWidthChange(() => {
            this.setState(st => st)
        })
    }
    render() {
        const { _widths: { activeWidthsProvider } } = platform
        return activeWidthsProvider !== this
            ? <React.Fragment>{this.props.children}</React.Fragment>
            : <context.Provider value={platform.actWidth()}>{this.props.children}</context.Provider>

    }
    componentWillUnmount() {
        const { _widths } = platform
        if (_widths.activeWidthsProvider !== this) return
        _widths.activeWidthsProvider = null
        this.unsubscribe()
    }
}
