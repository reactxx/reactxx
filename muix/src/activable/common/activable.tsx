import React from 'react'
import warning from 'warning'

import { Types, TCommonStyles } from 'reactxx-basic'

export namespace TActivable {

  export type RulesetAddInLow<T> = T extends never ? never : {
    $active?: {
      True?: T
      False?: T
      Disabled?: T
    }
  }

  export type RulesetAddInX<T extends TCommonStyles.RulesetNativeIds = never> = RulesetAddInLow<Types.RulesetX<T>>
  export type RulesetX<T extends TCommonStyles.RulesetNativeIds = never> = Types.RulesetX<T> & RulesetAddInX<T>

  export type SheetWithAddIn = { [P in string]: RulesetAddIn }

  export type RulesetAddIn<T extends TCommonStyles.RulesetNativeIds = never> = RulesetAddInLow<TCommonStyles.Ruleset<T>>
  export interface RulesetAddInWeb<T extends TCommonStyles.RulesetNativeIds = never> extends RulesetAddInLow<TCommonStyles.RulesetWeb> { }
  export type RulesetAddInNative<T extends TCommonStyles.RulesetNativeIds = never> = RulesetAddInLow<TCommonStyles.RulesetNative<T>>

  export interface ActiveResult {
    active: boolean
    setActive: (active: boolean) => void
  }

}

/************************
* EXPORTED
*************************/

export const activeFlag = (input: () => boolean, output: (output: TActivable.ActiveResult) => void, next: () => React.ReactNode) => {
  let component: ActivableComponent
  const render = active => {
    output({ active, setActive: component.setActive })
    return next()
  }
  const res = () => {
    if (input()) return <ActivableComponent ref={self => component = self}>{render}</ActivableComponent>
    output(null)
    return next()
  }
  return res
}

export const activeSheet = (input: () => { sheet: TActivable.SheetWithAddIn, activeFlag: boolean, activable: boolean }, output: (patch: Types.Sheet) => void, next: () => React.ReactNode) => {
  const res = () => {
    const { sheet, activeFlag, activable } = input()
    if (activable === true) {
      const patch: Types.Sheet = {}
      for (const p in sheet) {
        const rs = sheet[p]
        if (!rs || !rs.$active) continue
        const { Disabled, False, True } = rs.$active
        if (True && activeFlag === true) patch[p] = True
        else if (Disabled && typeof activeFlag === 'undefined') patch[p] = Disabled
        else if (False) patch[p] = False
      }
      output(patch)
      return next()
    } else {
      output(null)
      return next()
    }
  }
  return res
}


/************************
* PRIVATE
*************************/

interface ActivableState {
  active: boolean
}

interface ActivableProps {
  ref: (self: ActivableComponent) => void
  children: (active: boolean) => React.ReactNode
}

class ActivableComponent extends React.Component<ActivableProps, ActivableState> {

  state: ActivableState = { active: false }

  componentDidMount() {
    if (this.props.ref) this.props.ref(this)
  }

  render() {
    return this.props.children(this.state.active)
  }

  setActive = (active: boolean) => this.setState({ active })
}