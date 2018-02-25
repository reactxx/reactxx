//Follows react 16.3 context api, see polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js

import React from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

interface BroadcastComponentProp<T> { pBroadcastValue?: T; sBroadcastIsQuiet?: boolean; sSelector?: (data: T) => {} }
interface BroadcastComponent<T> extends React.Component<BroadcastComponentProp<T>> { _broadcast?: sData<T> & pData<T>; }

type Subscribe<T> = (subscription: Subscription<T>) => Unsubscribe
type Subscription<T> = (data: T) => void
type Unsubscribe = () => void

interface ContextData { broadcasts: Channels }
const ContextDef = { broadcasts: PropTypes.any }

interface Channel<T> {
  subscribe: Subscribe<T>
  getValue: () => T
}
interface Channels {
  [id: number]: Channel<{}>
}

interface Data<T> {
  channels: Channels
}
interface sData<T> extends Data<T> {
  sChannel?: Channel<T>
  sUnsubscribe?: Unsubscribe
  sSelector?: (data: T) => {}
  sChildContext?: ContextData
  sValue?
}
interface pData<T> extends Data<T> {
  sSubscribers?: Subscription<T>[]
}


class createContextLib<T extends {}> {

  constructor(private defaultValue: T) { }

  //*************** standard PROVIDER part

  pInit(self: BroadcastComponent<T>) {
    if (!self._broadcast) self._broadcast = {
      channels: self.context.broadcasts || {},
    }
    self._broadcast.sSubscribers = []

    //init child context
    const { defaultValue, channelId } = this
    const { _broadcast, _broadcast: { channels = {} }, props: { pBroadcastValue } } = self

    _broadcast.sChildContext = {
      broadcasts: {
        ...channels,
        [channelId]: {
          subscribe: subscriber => {
            _broadcast.sSubscribers.push(subscriber)
            return () => _broadcast.sSubscribers = _broadcast.sSubscribers.filter(s => s !== subscriber)
          },
          getValue: () => pBroadcastValue || defaultValue
        } as Channel<T>
      } 
    } as ContextData
  }

  pGetChildContext(self: BroadcastComponent<T>) {
    const { _broadcast: { sChildContext } } = self
    return sChildContext
  }

  pComponentWillReceiveProps(self: BroadcastComponent<T>, nextProps: BroadcastComponentProp<T>) {
    const { _broadcast, _broadcast: { sSubscribers }, props: { pBroadcastValue } } = self
    if (pBroadcastValue === nextProps.pBroadcastValue) return
    sSubscribers.forEach(s => s(nextProps.pBroadcastValue))
  }

  //*************** standard CONSUMER part (with SELECTOR possibility)

  sInit(self: BroadcastComponent<T>) {
    const { channelId } = this
    if (!self._broadcast) self._broadcast = { channels: self.context.broadcasts, sSelector: self.props.sSelector }
    const { _broadcast, _broadcast: { sSelector, channels } } = self
    const sChannel = _broadcast.sChannel = channels && channels[channelId] as Channel<T>
    const val = sChannel ? sChannel.getValue() : this.defaultValue
    _broadcast.sValue = sSelector ? sSelector(val) : val
  }

  sComponentDidMount(self: BroadcastComponent<T>) {
    const { _broadcast, _broadcast: { sSelector, sChannel } } = self
    if (!sChannel) {
      warning(self.props.sBroadcastIsQuiet, '<Consumer> was rendered outside the context of its <Provider>')
      return
    }
    _broadcast.sUnsubscribe = sChannel.subscribe(sBroadcastValue => {
      if (!sSelector) {
        //non selector variant
        _broadcast.sValue = sBroadcastValue; self.forceUpdate()
      } else {
        //with selector: use shallowEqual to compare old and new value, call forceUpdate when difference found
        const newVal = sSelector(sBroadcastValue)
        if (shallowEqual(_broadcast.sValue, newVal)) return
        _broadcast.sValue = newVal
        self.forceUpdate()
      }
    })
  }

  sComponentWillUnmount(self: BroadcastComponent<T>) {
    const { _broadcast } = self
    if (_broadcast.sUnsubscribe) _broadcast.sUnsubscribe()
  }

  sRender(self: BroadcastComponent<T>) {
    const { props, _broadcast: { sValue } } = self
    const children = props.children as React.SFC<T>
    return children ? children(sValue) : null
  }

  //*************** PROVIDER is CONSUMMER too
  spInit(self: BroadcastComponent<T>) {
    this.pInit(self)
    this.sInit(self)
    delete self._broadcast.sSelector //sSelector is ignored for this case
  }

  //*************** COMMON part
  private channelId = createContextLib.uid++
  static uid = 1
}

export const createContext = <T>(defaultValue: T) => {
  const lib = new createContextLib(defaultValue)

  class Provider extends React.Component<BroadcastComponentProp<T>> {
    constructor(p, c) { super(p, c); lib.pInit(this) }
    getChildContext() { return lib.pGetChildContext(this) }
    componentWillReceiveProps(nextProps) { lib.pComponentWillReceiveProps(this, nextProps) }
    render() { return this.props.children }

    static contextTypes = ContextDef
    static childContextTypes = ContextDef
  }

  class Consumer extends React.Component<BroadcastComponentProp<T>> {
    constructor(p, c) { super(p, c); lib.sInit(this) }
    componentDidMount() { lib.sComponentDidMount(this) }
    componentWillUnmount() { lib.sComponentWillUnmount(this) }
    render() { return lib.sRender(this) }

    static contextTypes = ContextDef
  }

  return { Provider, Consumer }

}

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
