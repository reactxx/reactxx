//Patch of react 16.3 context api polyfill on https://github.com/ReactTraining/react-broadcast/blob/next/modules/createContext.js

import React from "react";
import PropTypes from "prop-types";
import warning from "warning";

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


interface ConsumerProps<T> {
  quiet?: boolean
  select?: (state: T) => {}
}

export const createContext = <T>(defaultValue: T) => {

  const channel = uid++;

  class Provider extends React.Component<{ value?: T }> {

    subscribers = []
    publish = (value:T) => this.subscribers.forEach(s => s(value))

    subscribe = subscriber => {
      this.subscribers.push(subscriber)
      return () => this.subscribers = this.subscribers.filter(s => s !== subscriber)
    }

    getValue = () => this.props.value

    getChildContext() {
      return {
        broadcasts: {
          ...this.context.broadcasts,
          [channel]: {
            subscribe: this.subscribe,
            getValue: this.getValue
          }
        }
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) this.publish(nextProps.value);
    }

    render() {
      return this.props.children;
    }

    static contextTypes = { broadcasts: PropTypes.any }
    static childContextTypes = { broadcasts: PropTypes.any }
    static defaultProps = { value: defaultValue }

  }

  class Consumer extends React.Component<ConsumerProps<T>> {
    broadcast = this.context.broadcasts && this.context.broadcasts[channel]
    unsubscribe: () => void
    state: { value: T } = { value: this.broadcast ? this.broadcast.getValue() : defaultValue }

    componentDidMount() {
      if (this.broadcast)
        this.unsubscribe = this.broadcast.subscribe(value => this.setState({ value }))
      else
        warning(this.props.quiet, "<Consumer> was rendered outside the context of its <Provider>")
    }

    componentWillUnmount() {
      if (this.unsubscribe) this.unsubscribe();
    }

    render() {
      const children = this.props.children as React.SFC<T>
      return children ? children(this.state.value) : null
    }

    static contextTypes = { broadcasts: PropTypes.any }

  }

  return {
    Provider,
    Consumer
  }
}
let uid = 1