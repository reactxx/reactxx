//Follows react 16.3 context api, see polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js

import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

interface BroadcastComponentProp<T> { pBroadcastValue?: T; sBroadcastIsQuiet?: boolean; sSelector?: (data: T) => {} }

type Subscribe<T> = (subscription: Subscription<T>) => Unsubscribe
type Subscription<T> = (data: T) => void
type Unsubscribe = () => void

interface Channel<T> {
  subscribe: Subscribe<T>
  getValue: () => T
}

const createContextLib = <T>(defaultValue: T, _channelId?: string) => {

  const channelId = _channelId || 'channel-' + uid++
  const contextType = { [channelId]: PropTypes.any }

  class lib extends React.Component<BroadcastComponentProp<T>> {

    //*************** standard PROVIDER part
    pSubscribers: Subscription<T>[]
    pChildContext

    pInitChildContext() {
      const { props: { pBroadcastValue } } = this
      return {
        [channelId]: {
          subscribe: subscriber => {
            this.pSubscribers.push(subscriber)
            return () => this.pSubscribers = this.pSubscribers.filter(s => s !== subscriber)
          },
          getValue: () => pBroadcastValue || defaultValue
        } as Channel<T>
      }
    }

    pGetChildContext() { return this.pChildContext }

    pComponentWillReceiveProps(nextProps: BroadcastComponentProp<T>) {
      const { pSubscribers, props: { pBroadcastValue } } = this
      if (pBroadcastValue === nextProps.pBroadcastValue) return
      pSubscribers.forEach(s => s(nextProps.pBroadcastValue))
    }

    //*************** standard CONSUMER part (with SELECTOR possibility)
    sChannel: Channel<T> = this.context[channelId]
    sUnsubscribe: Unsubscribe
    sSelector: (data: T) => {}
    sValue: any

    sInitValue(): any {
      const { sSelector, sChannel } = this
      const val = sChannel ? sChannel.getValue() : defaultValue
      return sSelector ? sSelector(val) : val
    }

    sComponentDidMount() {
      const { sSelector, sChannel } = this
      if (!sChannel) {
        warning(this.props.sBroadcastIsQuiet, '<Consumer> was rendered outside the context of its <Provider>')
        return
      }
      this.sUnsubscribe = sChannel.subscribe(sBroadcastValue => {
        if (!sSelector) {
          //non selector variant
          this.sValue = sBroadcastValue; this.forceUpdate()
        } else {
          //with selector: use shallowEqual to compare old and new value, call forceUpdate when difference found
          const newVal = sSelector(sBroadcastValue)
          if (shallowEqual(this.sValue, newVal)) return
          this.sValue = newVal
          this.forceUpdate()
        }
      })
    }

    sComponentWillUnmount() {
      if (this.sUnsubscribe) this.sUnsubscribe()
    }

    sRender() {
      const { props, sValue } = this
      const children = props.children as React.SFC<T>
      return children ? children(sValue) : null
    }

    //*************** COMMON part
    static contextTypes = contextType
  }

  class Provider extends lib {
    pSubscribers = []

    getChildContext() { return this.pGetChildContext() }
    componentWillReceiveProps(nextProps) { this.pComponentWillReceiveProps(nextProps) }
    render() { return this.props.children }

    static childContextTypes = contextType
  }

  class Modifier extends lib {
    pSubscribers = []
    pChildContext = this.pInitChildContext()
    getChildContext() { return this.pGetChildContext() }
    componentWillReceiveProps(nextProps) { this.pComponentWillReceiveProps(nextProps) }
    static childContextTypes = contextType

    sSelector = this.props.sSelector
    state = { value: this.sInitValue() }
    componentDidMount() { this.sComponentDidMount() }
    componentWillUnmount() { this.sComponentWillUnmount() }
  }

  class Consumer extends lib {
    sSelector = this.props.sSelector
    pChildContext = this.pInitChildContext()
    state = { value: this.sInitValue() }

    componentDidMount() { this.sComponentDidMount() }
    componentWillUnmount() { this.sComponentWillUnmount() }
    render() { return this.sRender() }
  }

  return { Provider, Modifier, Consumer }

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
