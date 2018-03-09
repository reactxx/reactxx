//******************************************
// 
// https://github.com/reactxx/reactxx/blob/master/muix/src/test/common/stateman/index.tsx
//
// Both reactxx-stateman and RenderCounter component in this example uses React render props extensively. 
// See https://reactjs.org/docs/render-props.html for details
// 
//******************************************

import * as React from 'react'

import { createContext, ConsumerType } from 'reactxx-stateman'

//Global APP state
export interface State { colors: { background: string, color: string }, title: string }

//title and color substate
interface TextStateProps { color: string; title: string }
//background only substate
interface BackgroundStateProps { background: string }
//all substate 
type BothStateProps = State

const { Provider, Consumer, Modifier } = createContext<State>(null)

//Consumer's 'selector' and 'render' props typing. 
const ConsumerText = Consumer as ConsumerType<State, TextStateProps> //select title and color
const ConsumerBackground = Consumer as ConsumerType<State, BackgroundStateProps> //select background
const ConsumerBoth = Consumer as ConsumerType<State, BothStateProps> //select all

const style = {
  width: '300px',
  height: '20px',
  margin: '10px',
  padding: '10px',
  border: '1px solid gray',
  textAlign: 'center',
  fontWeight: 'bold'
} as React.CSSProperties

//Pure component with title and color consumer
class Text extends React.PureComponent {
  render() {
    //ConsumerText listen to Provider.value.title and  Provider.value.colors.color change
    return <ConsumerText selector={st => ({ title: st.title, color: st.colors.color })} render={({ color, title }) => <RenderCounter>
      {({ renderCount }) => <div style={{ ...style, color }}>TEXT: {title}{renderCount}</div>}
    </RenderCounter>} />
  }
}

//Pure component with background consumer
class Background extends React.PureComponent {
  render() {
    //ConsumerBackground listen to Provider.value.background
    return <ConsumerBackground selector={st => ({ background: st.colors.background })} render={({ background: backgroundColor }) => <RenderCounter>
      {({ renderCount }) => <div style={{ ...style, backgroundColor }}>BACKGROUND: {renderCount}</div>}
    </RenderCounter>} />
  }
}

//Pure component with background, color and title consumer
class Both extends React.PureComponent {
  render() {
    //ConsumerBoth listen to to Provider.value.background, Provider.value.title and Provider.value.colors.color change
    return <ConsumerBoth selector={st => st} render={({ colors: { background: backgroundColor, color }, title }) => <RenderCounter>
      {({ renderCount }) => <div style={{ ...style, backgroundColor, color }}>BOTH: {title}{renderCount}</div>}
    </RenderCounter>} />
  }
}

//Helper components, counts number of its render() method calls
class RenderCounter extends React.Component {
  counter = 0
  render() {
    this.counter++
    return (this.props.children as React.SFC<any>)({
      renderCount: <span style={{ color: 'gray', fontWeight: 'normal' }}>{` (renders: ${this.counter})`}</span>
    })
  }
}

//Test application
export default class App extends React.Component<any, State> {
  state = { colors: { background: 'lightblue', color: 'red' }, title: 'T' }
  render() {
    return <div>
      {/* TOOLBAR */}
      <a href='#' onClick={() => this.setState(st => ({ ...st, colors: { ...st.colors, background: st.colors.background === 'lightblue' ? 'lightgreen' : 'lightblue' } }))}>Toggle background</a>{' | '}
      <a href='#' onClick={() => this.setState(st => ({ ...st, colors: { ...st.colors, color: st.colors.color === 'red' ? 'black' : 'red' } }))}>Toggle color</a>{' | '}
      <a href='#' onClick={() => this.setState(st => ({ ...st, title: st.title + 'T' }))}>Modify title</a>
      <hr />
      {/* Broadcast this state via Provider value prop */}
      <Provider value={this.state}>
        {/*Pure components: not rendered when Provider value prop changed */}
        <Text />
        <Background />
        <Both />
        <blockquote>
          <h3>Use Modifier to modify state.title</h3>
          {/* Modifier listen for Provider.value changes. Then modifi value props and notify Consumers's  */}
          <Modifier modify={st => ({ ...st, title: st.title + '-' + st.title })}>
            <Text />
            <Background />
            <Both />
          </Modifier>
        </blockquote>
      </Provider>
    </div>
  }
}
