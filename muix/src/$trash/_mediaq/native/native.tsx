import React from 'react';
import { Dimensions } from 'react-native';
import * as Sheeter from 'reactxx-sheeter';
import { TMediaQ } from '../typings/mediaq';


export class MediaQ_AppContainer extends React.Component<{}, { width: number }> {

  state = { width: Dimensions.get('window').width }

  constructor(props) {
    super(props)
    appContainer = appContainer || this
    if (appContainer === this) {
      Dimensions.addEventListener('change', arg => this.setState({ width: Dimensions.get('window').width }))
    }
  }
  render() {
    return appContainer !== this ? <React.Fragment>{this.props.children}</React.Fragment> : <context.Provider value={this.state.width}>{this.props.children}</context.Provider>
  }

  componentWillUnmount() {
    if (appContainer === this) appContainer = null
  }

}

export const mediaQFlags = (input: () => TMediaQ.MediaQFlagsInputPar, next: () => React.ReactNode) => {
  let pars: TMediaQ.MediaQFlagsInputPar
  const render = (width: number) => {
    (pars.getPropsPatches || (pars.getPropsPatches = {})).$mediaq = propsPatchGetterCreator(width)
    return next()
  }
  const res = () => {
    pars = input()
    return <context.Consumer>{render}</context.Consumer>
  }
  return res
}

export const mediaqFinishAddInProps: Sheeter.FinishAddIn = null
export const mediaqFinishAddInClasses: Sheeter.FinishAddIn = null

export const mediaQSheet = (input: () => Sheeter.RulesetPatchGetters, next: () => React.ReactNode) => {
  let filters: Sheeter.RulesetPatchGetters
  const render = (width: number) => {
    filters.$mediaq = Sheeter.mediaqRulesetPatchGetterCreator(width)
    return next()
  }
  const res = () => {
    filters = input()
    return <context.Consumer>{render}</context.Consumer>
  }
  return res
}

/************************
* PRIVATE
*************************/

const context = React.createContext<number>(0)

let appContainer: MediaQ_AppContainer

const propsPatchGetterCreator: (width: number) => Sheeter.PropsPatchGetter = width => (intervals: TMediaQ.NotifyIntervalX, map) => {
  const $mediaq: TMediaQ.MediaFlags = {}
  for (const p in intervals) {
    const [beg, end] = intervals[p]
    $mediaq[p] = (!beg || beg <= width) && (!end || end > width)
  }
  map.push({ $mediaq })
}

