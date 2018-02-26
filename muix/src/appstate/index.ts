//Inspired by react 16.3 context api. And by its polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js

import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

interface ProviderProps<T> { value?: T }
interface ConsumerProps<T, TSel = {}> { quiet?: boolean; selector?: (data: T) => TSel; render?: (selected: TSel) => React.ReactNode }
interface ModifierProps<T, TSel = {}> extends ConsumerProps<T, TSel> { modify: (data: T) => T }

export type ConsumerComp<T, TSel> = React.ComponentClass<ConsumerProps<T, TSel>>
export type ModifierComp<T, TSel> = React.ComponentClass<ModifierProps<T, TSel>>

type Subscribe<T> = (subscription: Subscription<T>) => Unsubscribe
type Subscription<T> = (data: T) => void
type Unsubscribe = () => void

interface Channel<T> {
  subscribe: Subscribe<T>
  getInitValue: () => T
}

const enum Roles { provider, consumer, modifier }

/**
 * /
 * @param defaultValue
 * @param _channelId

Extends new react (v16.3) context api ideas:
- Consumer has "selector" (inspired by Redux). Consumer is waked up only when shallowEq of selected value returns false
- Modifier as another component which createContext returns. It behavs as both Provider and Consumer. 
  Modifier:
  - modify input value 
  - use this modified value (as Consumer)
  - sends this value to subtree (as Provider)
- Consumer and Modifier has render prop for simplier Typescript typing
 */

export const createContext = <T>(defaultValue: T, _channelId?: string) => {

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
            getInitValue: () => {
              if (this.role === Roles.modifier) return this.mModifiedValue
              else return this.props.value || defaultValue
            }
          } as Channel<T>
        }
      }
      if (this.role != Roles.provider) {
        this.sSelector = this.props.selector
        this.sChannel = this.context[channelId]
        let val = this.sChannel ? this.sChannel.getInitValue() : defaultValue
        if (this.role === Roles.modifier) {
          this.mModify = this.props.modify
          val = this.mModifiedValue = this.mModify(val)
        }
        const value = this.sSelector ? this.sSelector(val) : val
        this.state = { value }

      }
    }

    //special modifier fields
    mModifiedValue: T
    mModify: (data: T) => T //freeze modify prop

    //provider fields
    pSubscribers: Subscription<T>[]
    pChildContext

    //consumer fields
    sChannel: Channel<T>
    sUnsubscribe: Unsubscribe
    sSelector: (data: T) => {} //freeze selector prop

    //*************** PROVIDER part

    componentWillReceiveProps(nextProps: ProviderProps<T>) {
      if (this.role !== Roles.provider) return
      //for providers (provider & modifier)
      const { pSubscribers, props: { value } } = this
      if (value === nextProps.value) return
      pSubscribers.forEach(s => s(nextProps.value))
    }

    //*************** CONSUMER part (with SELECTOR possibility)

    componentDidMount() {
      if (this.role === Roles.provider) return
      const { sSelector, pSubscribers, sChannel, state: { value }, mModify } = this
      if (!sChannel) {
        warning(this.props.quiet, '<Consumer> or <Modifier> was rendered outside the context of its <Provider>')
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

    //*************** ALL

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

  type TConsumer<TSel> = React.ComponentClass<ConsumerProps<T, TSel>>

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
