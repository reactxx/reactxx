import React from 'react'
import {Store, useStore } from '../index'

//================ store example
interface IState {
    firstName: string
    lastName: string
}
class StoreExapmle extends Store<IState> {
    // typed procs instead of actions
    setNames = (firstName: string) => this.setState({ firstName, lastName: this.state.lastName + 'x' })
}
// store, used when no Provider exists
const globalStore = new StoreExapmle({ firstName: 'First', lastName: 'Default' })

const StoreExampleContext = React.createContext<StoreExapmle>(null)

const StoreExampleProvider: React.SFC<{ initState: IState }> = props => {
    const store = React.useRef(new StoreExapmle(props.initState))
    return <StoreExampleContext.Provider value={store.current}>
        {props.children}
    </StoreExampleContext.Provider>
}

//================ useStore example
const UseStoreExample: React.SFC = () => {
    const renderCount = React.useRef(0)
    renderCount.current += 1

    const store = React.useContext(StoreExampleContext) || globalStore

    const [state, dispatch] = useStore(store, st => ({ name: st.firstName.charAt(0).toUpperCase() + st.lastName.charAt(0).toUpperCase() }))
    return <p>
        <b>Rendered {renderCount.current} times</b>
        <div onClick={() => dispatch.setNames('Franz')}>Set Franz ({state.name})</div>
        <div onClick={() => dispatch.setNames('Charlie')}>Set Charlie ({state.name})</div>
    </p>
}
const DumpStoreExample: React.SFC = () => {
    const renderCount = React.useRef(0)
    renderCount.current += 1
    const store = React.useContext(StoreExampleContext) || globalStore
    const [state] = useStore(store)
    const { firstName, lastName } = state
    return <div><i>
        {firstName}
        {lastName}
        ({renderCount.current})
    </i></div>
}

const App: React.SFC = () => {
    const [, setState] = React.useState(null) // forceUpdate
    return <>
        <div onClick={() => setState(null)}>REFRESH</div>
        <hr />
        <DumpStoreExample />
        <UseStoreExample />
        <UseStoreExample />
        <hr />
        <StoreExampleProvider initState={{ firstName: 'First', lastName: 'Last' }}>
            <DumpStoreExample />
            <UseStoreExample />
            <UseStoreExample />
        </StoreExampleProvider>
        <hr />
        <div key={forceCreate++}>
            <StoreExampleProvider initState={{ firstName: 'First', lastName: 'Second' }}>
                <DumpStoreExample />
                <UseStoreExample />
                <UseStoreExample />
            </StoreExampleProvider>
        </div>
    </>
}
let forceCreate = 0

export default App