//Follows react 16.3 context api, see polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js

import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

interface ProviderProps<T> { initValue?: T }
interface ConsumerProps<T> { isQuiet?: boolean; selector?: (data: T) => {} }
interface ModifierProps<T> extends ProviderProps<T>, ConsumerProps<T> { modify: (data: T) => T }

type Subscribe<T> = (subscription: Subscription<T>) => Unsubscribe
type Subscription<T> = (data: T) => void
type Unsubscribe = () => void

interface Channel<T> {
  subscribe: Subscribe<T>
  getValue: () => T
}

export const createContextLib = <T>(defaultValue: T, _channelId?: string) => {

  const channelId = _channelId || 'channel-' + uid++
  const contextType = { [channelId]: PropTypes.any }

  class ComponentLow extends React.Component<ModifierProps<T>, { value }> {

    //*************** PROVIDER part
    pSubscribers = []
    pChildContext

    pInitChildContext(isModifier:boolean) {
      return {
        [channelId]: {
          subscribe: subscriber => {
            this.pSubscribers.push(subscriber)
            return () => this.pSubscribers = this.pSubscribers.filter(s => s !== subscriber)
          },
          getValue: () => {
            if (isModifier) return this.sInitFromParent()
            const { props: { initValue } } = this
            return initValue || defaultValue
          }
        } as Channel<T>
      }
    }

    pGetChildContext() { return this.pChildContext }

    pComponentWillReceiveProps(nextProps: ProviderProps<T>) {
      const { pSubscribers, props: { initValue } } = this
      if (initValue === nextProps.initValue) return
      pSubscribers.forEach(s => s(nextProps.initValue))
    }

    //*************** CONSUMER part (with SELECTOR possibility)
    sChannel: Channel<T>
    sUnsubscribe: Unsubscribe
    sSelector: (data: T) => {}

    sInitFromParent(): any {
      const { sSelector, sChannel } = this
      const val = sChannel ? sChannel.getValue() : defaultValue
      return sSelector ? sSelector(val) : val
    }

    sComponentDidMount() {
      const { sSelector, pSubscribers, sChannel, state: { value }, props: { modify } } = this
      if (!sChannel) {
        warning(this.props.isQuiet, '<Consumer> or <Modifier> was rendered outside the context of its <Provider>')
        return
      }
      this.sUnsubscribe = sChannel.subscribe(sBroadcastValue => {
        if (pSubscribers && modify) { //modifier
          sBroadcastValue = modify(sBroadcastValue)
          pSubscribers.forEach(s => s(sBroadcastValue))
        }
        if (!sSelector)
          //without selector:
          this.setState({ value: sBroadcastValue })
        else {
          //with selector: use shallowEqual to compare old and new value, call forceUpdate when difference found
          const newVal = sSelector(sBroadcastValue)
          if (shallowEqual(value, newVal)) return
          this.setState({ value: newVal })
        }
      })
    }

    sComponentWillUnmount() {
      if (this.sUnsubscribe) this.sUnsubscribe()
    }

    sRender() {
      const { props: { children }, state: { value } } = this
      if (typeof children === 'function') return (children as React.SFC)(value)
      else return children
    }

  }

  class Provider extends ComponentLow {
    pSubscribers = []
    pChildContext = this.pInitChildContext(false)

    getChildContext() { return this.pChildContext }
    componentWillReceiveProps(nextProps) { this.pComponentWillReceiveProps(nextProps) }
    render() { return this.props.children }

    static childContextTypes = contextType
  }

  class Modifier extends ComponentLow {
    pSubscribers = []
    pChildContext = this.pInitChildContext(true)

    getChildContext() { return this.pChildContext }
    componentWillReceiveProps(nextProps) { this.pComponentWillReceiveProps(nextProps) }

    sSelector = this.props.selector
    sChannel = this.context[channelId]
    state = { value: this.sInitFromParent() }

    componentDidMount() { this.sComponentDidMount() }
    componentWillUnmount() { this.sComponentWillUnmount() }
    render() { return this.sRender() }

    static childContextTypes = contextType
    static contextTypes = contextType
  }

  class Consumer extends ComponentLow {
    sSelector = this.props.selector
    sChannel = this.context[channelId]
    state = { value: this.sInitFromParent() }

    componentDidMount() { this.sComponentDidMount() }
    componentWillUnmount() { this.sComponentWillUnmount() }
    render() { return this.sRender() }

    static contextTypes = contextType
  }

  return {
    Provider: Provider as React.ComponentClass<ProviderProps<T>>,
    Modifier: Modifier as React.ComponentClass<ModifierProps<T>>,
    Consumer: Consumer as React.ComponentClass<ConsumerProps<T>>,
  }
}
let uid = 0

const shallowEqual = (objA: {}, objB: {}) => {
  if (objA === objB) return true

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) return false

  const keysA = Object.keys(objA); if (keysA.length !== Object.keys(objB).length) return false

  // Test for A's keys different from B.
  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  for (let i = 0; i < keysA.length; i++) {
    const prop = keysA[i]
    if (!bHasOwnProperty(prop) || objA[prop] !== objB[prop]) return false
  }

  return true;
}
