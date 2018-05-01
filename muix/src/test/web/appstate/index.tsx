//import React from 'react'

//import { createContext, ConsumerType, ModifierType } from 'reactxx-stateman'


//export interface Context {
//  theme: string
//  overrides: { c1?: string; c2?: string }
//}

//const { Consumer, Modifier, Provider } = createContext<Context>({ theme: '', overrides: {} })

//// selector & render props typing
//const Consumer1 = Consumer as ConsumerType<Context, { themex: string }>
//const Consumer2 = Consumer as ConsumerType<Context, { theme: string; c1: string }>
//const Consumer3 = Consumer as ConsumerType<Context, { theme: string; c2: string }>
//const Modifier1 = Modifier as ModifierType<Context, { c2: string }>

//class Dump extends React.PureComponent<{ id: string; title?: string; theme?: string, c1?: string, c2?: string }> {
//  render() {
//    console.log('RENDER: ', this.props.id) //log every render to see how only PureComponents, which selected value is modified, are rendered.
//    return <div><b>{this.props.id}</b>: theme: {this.props.theme}, c1: {this.props.c1}, c2: {this.props.c2}, </div>
//  }
//}

//class Modify extends React.Component {
//  render() {
//    return <>
//      <Modifier modify={value => ({ ...value, theme: value.theme + '@ M' })}>
//        <Fragment />
//      </Modifier>
//    </>
//  }
//}

//class Dummy extends React.PureComponent { //shouldComponentUpdate returns false 
//  render() { return this.props.children }
//}

//const Fragment: React.SFC = () => <>
//  <Dummy key={1}>
//    <Consumer1 key={1} selector={v => ({ themex: v.theme })} render={v =>
//      <Dump id='1' theme={v.themex} />
//    } />
//    <Consumer2 key={2} selector={v => ({ theme: v.theme, c1: v.overrides.c1 })} render={v =>
//      <Dump id='2' theme={v.theme} c1={v.c1} />
//    } />
//  </Dummy>
//  <Dummy key={2}>
//    <Consumer3 key={3} selector={v => ({ theme: v.theme, c2: v.overrides.c2 })} render={v =>
//      <Dump id='3' theme={v.theme} c2={v.c2} />
//    } />
//  </Dummy>
//</>

//class App extends React.Component<any, Context> {
//  state = { theme: 'theme', overrides: { c1: 'c1', c2: 'c2' } }
//  render() {
//    console.log('APP')
//    return <Provider value={this.state}>
//      <a href='#' onClick={() => this.setState(st => ({ ...st, theme: st.theme + '-t' }))}>MODIFY THEME</a> |
//      <a href='#' onClick={() => this.setState(st => ({ ...st, overrides: { ...st.overrides, c1: st.overrides.c1 + '-c1' } }))}>MODIFY c1</a> |
//      <a href='#' onClick={() => this.setState(st => ({ ...st, overrides: { ...st.overrides, c2: st.overrides.c2 + '-c2' } }))}>MODIFY c2</a> |
//      <a href='#' onClick={() => this.forceUpdate()}>FORCE update</a> |
//      <hr />
//      <h2>Consumers</h2>
//      <Fragment />
//      <hr />
//      <h2>Modifier in children</h2>
//      <Modify />
//      <hr />
//      <h2>Modifier as both consumer and provider</h2>
//      <Modifier1 modify={value => ({ ...value, overrides: { ...value.overrides, c2: value.overrides.c2 + '*M' } })} selector={v => ({ c2: v.overrides.c2 })} render={v => <>
//        <h4>{v.c2}</h4>{/*consume modified value*/}
//        <Fragment />{/*provide modified value to subtree*/}
//      </>
//      } />
//      {/*
//      */}
//    </Provider>
//  }
//}

//export default App
