import React from 'react'
import ReactN from 'react-native'

import { TCommon, ThemeProvider, theme, renderAddIn, TRenderState as TRenderStateBasic, withStyles, mergeSheets } from 'reactxx-basic'
import { animations, TAnimation } from 'reactxx-animation'

import { Types } from '../typings/types'
import { TAddIn } from '../typings/add-in'

/************************
* TRenderState
*************************/
export interface TRenderState extends TRenderStateBasic {
  addInProps?: TAddIn.PropsX
  codeSystemProps?: Types.CodeSystemProps
  addInClasses?: TAddIn.SheetX
}

/************************
* ADDINS
*************************/

export const afterToPlatform = (state: TRenderState, next) =>
  animations( // process animation $animations part of sheet
    () => state.addInClasses.$animations,
    animations => state.codeSystemProps.animations = animations,
    next
  )

// after converting props and sheet to platform dependent form
renderAddIn.afterToPlatform = afterToPlatform

export const toPlatformSheetHooks = (propName: string, value) => {
    if (propName != '$animations') return {}
    return {
      done: true,
      value: (val => {
        const res = {}
        for (const p in val) res[p] = mergeSheets(null, val)
        return res
      })()
    }
  }

renderAddIn.toPlatformSheetHooks = [
  toPlatformSheetHooks
]

/************************
* WITH STYLES CREATOR
*************************/

export const withStylesCreator =
  <R extends Types.Shape, TStatic extends {} = {}>
    (displayName: string, sheetCreator: Types.SheetCreatorX<R>, component: Types.CodeComponentType<R>, options?: Types.WithStyleOptions_ComponentX<R>) =>
    (overrideOptions?: Types.WithStyleOptions_ComponentX<R>) => withStyles<R, TStatic>(name, sheetCreator, options, overrideOptions)(component) as React.ComponentClass<Types.PropsX<R>> & TProvider<R> & TStatic

export interface TProvider<R extends Types.Shape> { Provider: React.ComponentClass<Types.PropsX<R>> }

