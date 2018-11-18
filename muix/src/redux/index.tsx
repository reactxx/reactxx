import React from 'react'

export class Store<TState = {}> {

    constructor(private state: TState) { }

    useStore<TSelected = TState>(selector?: (st: TState) => TSelected): [TSelected, this] {

        const self = this

        if (selector === null) return [null, this] // no selector => return dispatcher only

        const [state, setState] = React.useState(selector ? selector(this.state) : this.state) // get actual state

        // remember old state
        const oldState = React.useRef()
        React.useEffect(() => oldState.current = { ...state as any }) //called on every render

        React.useEffect(() => { // called during mount
            const id = ++self.counter
            self.handlers[id] = {
                oldState, selector, setState
            }
            return () =>
                delete self.handlers[id] // called during unmount
        }, [])

        return [state as TSelected, this] // return actual state and dispatcher
    }

    protected setState = (setter: (oldState: TState) => Partial<TState>) => {
        this.state = Object.assign(this.state, setter(this.state)) // new state
        for (const p in this.handlers) {
            const h = this.handlers[p]
            const newsState = h.selector ? h.selector(this.state) : this.state // new state selection
            if (shallowEqualObjects(h.oldState.current, newsState)) return // is the same as old one => NOP
            h.oldState.current = newsState
            h.setState(newsState) // is different => rerender
        }
    }

    private counter = 0
    private handlers: Record<string, IHandler> = {}
}

/*************** PRIVATE *******************/

interface IHandler {
    selector: (state) => any
    setState: (state) => void
    oldState: React.RefObj<any>
}

// modified https://github.com/moroshko/shallow-equal/blob/master/src/objects.js
const shallowEqualObjects = (objA: {}, objB: {}) => {
    if (objA === objB || !objA && !objB) return true
    if (!objA || !objB) return false
    const aKeys = Object.keys(objA), bKeys = Object.keys(objB), aLen = aKeys.length
    if (bKeys.length !== aLen) return false
    for (let i = 0; i < aLen; i++) {
        const key = aKeys[i]
        if (objA[key] !== objB[key]) return false
    }
    return true
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
// https://github.com/lodash/lodash/blob/master/eq.js
if (!Object.is)
    Object.is = (value, other) => value === other || (value !== value && other !== other)

//================ store example
interface IState {
    firstName: string
    lastName: string
}
class StoreExapmle extends Store<IState> {
    // typed procs instead of actions
    setNames = (firstName: string) => this.setState(st => ({ firstName, lastName: st.lastName + 'x' }))
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

    const [state, dispatch] = store.useStore(st => ({ name: st.firstName.charAt(0).toUpperCase() + st.lastName.charAt(0).toUpperCase() }))
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
    const [state] = store.useStore()
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