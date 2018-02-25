//Follows react 16.3 context api, see polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js

import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

interface ProviderProps<T> { initValue?: T }
export interface ConsumerProps<T, TSel extends {} = {}> { isQuiet?: boolean; selector?: (data: T) => TSel; render?: (selected: TSel) => React.ReactNode }
export interface ModifierProps<T, TSel extends {} = {}> extends ConsumerProps<T, TSel> { modify: (data: T) => T }

type Subscribe<T> = (subscription: Subscription<T>) => Unsubscribe
type Subscription<T> = (data: T) => void
type Unsubscribe = () => void

interface Channel<T> {
  subscribe: Subscribe<T>
  getValue: () => T
}

const enum Roles { provider, consumer, modifier }

export const createContextLib = <T>(defaultValue: T, _channelId?: string) => {

  const channelId = _channelId || 'channel-' + uid++
  const contextType = { [channelId]: PropTypes.any }

  class ComponentLow extends React.Component<ModifierProps<T> & ProviderProps<T>, { value }> {

    constructor(p, s, protected role: Roles) {
      super(p, s)
      if (this.role != Roles.consumer) {
        this.pSubscribers = []
        this.pChildContext = {
          [channelId]: {
            subscribe: subscriber => {
              this.pSubscribers.push(subscriber)
              return () => this.pSubscribers = this.pSubscribers.filter(s => s !== subscriber)
            },
            getValue: () => {
              if (this.role === Roles.modifier) return this.mModifiedValue
              const { props: { initValue } } = this
              return initValue || defaultValue
            }
          } as Channel<T>
        }
      }
      if (this.role != Roles.provider) {
        this.sSelector = this.props.selector
        this.sChannel = this.context[channelId]
        const val = this.sChannel ? this.sChannel.getValue() : defaultValue
        if (this.role === Roles.modifier) {
          this.mModify = this.props.modify
          this.mModifiedValue = this.mModify(val)
        }
        const value = this.sSelector ? this.sSelector(val) : val
        this.state = { value }
      }
    }

    mModifiedValue: T
    mModify: (data: T) => T

    pSubscribers: Subscription<T>[]
    pChildContext

    sChannel: Channel<T>
    sUnsubscribe: Unsubscribe
    sSelector: (data: T) => {}

    //*************** PROVIDER part

    componentWillReceiveProps(nextProps: ProviderProps<T>) {
      if (this.role !== Roles.provider) return
      const { pSubscribers, props: { initValue } } = this
      if (initValue === nextProps.initValue) return
      pSubscribers.forEach(s => s(nextProps.initValue))
    }

    //*************** CONSUMER part (with SELECTOR possibility)

    componentDidMount() {
      if (this.role === Roles.provider) return
      const { sSelector, pSubscribers, sChannel, state: { value }, mModify } = this
      if (!sChannel) {
        warning(this.props.isQuiet, '<Consumer> or <Modifier> was rendered outside the context of its <Provider>')
        return
      }
      this.sUnsubscribe = sChannel.subscribe(sBroadcastValue => {
        if (this.role === Roles.modifier) { //modifier
          this.mModifiedValue = sBroadcastValue = mModify(sBroadcastValue)
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

    componentWillUnmount() {
      if (this.role === Roles.provider) return
      if (this.sUnsubscribe) this.sUnsubscribe()
    }

    render() {
      if (this.role === Roles.provider) return this.props.children

      const { props: { children, render }, state: { value } } = this
      if (render) return render(value)
      if (typeof children === 'function') return (children as React.SFC)(value)
      else return children
    }

  }

  class Provider extends ComponentLow {
    constructor(p, s) { super(p, s, Roles.provider) }
    getChildContext() { return this.pChildContext }

    static childContextTypes = contextType
  }

  class Modifier extends ComponentLow {
    constructor(p, s) { super(p, s, Roles.modifier) }
    getChildContext() { return this.pChildContext }

    static childContextTypes = contextType
    static contextTypes = contextType
  }

  class Consumer extends ComponentLow {
    constructor(p, s) { super(p, s, Roles.consumer) }

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
