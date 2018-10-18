import React from 'react'
import { subscribeWidthChanged } from './subscribe'

// platform dependent import
import { actWidth } from 'reactxx-sheet-widths'

const context = React.createContext<number>(0)

export const Consumer = context.Consumer

export class WidthsProvider extends React.Component {
    state = { width: actWidth() }
    unsubscribe: () => void
    constructor(props) {
        super(props)
        if (activeWidthsProvider) return
        activeWidthsProvider = this
        this.unsubscribe = subscribeWidthChanged(width => this.setState({ width }))
    }
    render() {
        return activeWidthsProvider !== this
            ? <React.Fragment>{this.props.children}</React.Fragment>
            : <context.Provider value={this.state.width}>{this.props.children}</context.Provider>

    }
    componentWillUnmount() {
        if (activeWidthsProvider !== this) return
        activeWidthsProvider = null
        this.unsubscribe()
    }
}
// beware of only single active WidthsProvider component
let activeWidthsProvider: WidthsProvider