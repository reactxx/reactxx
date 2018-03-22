import React from 'react'
import ReactN from 'react-native'
import * as Cfg from 'typescript-config'

import { TBasic } from '../typings/basic'
import { toPlatformEvents, deepMerges, toPlatformSheet, toPlatformRuleSet } from './to-platform'

export const withStyles = <R extends TBasic.Shape>(sheetX: TBasic.SheetX<R>) => (Component: TBasic.CodeComponentType<R>) => { 

    class Styled extends React.PureComponent<TBasic.PropsX> {

    render() {
      const { classes: classesX, className: classNameX, style: styleX, $web, $native, onPress, onLongPress, onPressIn, onPressOut, ignore, ...other } = this.props as TBasic.PropsX & TBasic.OnPressAllX

      if (ignore) return null

      // get platform dependent static sheet
      const staticSheet = toPlatformSheet(sheetX)

      // get platform dependent classes
      let classes: TBasic.Sheet = toPlatformSheet(classesX as TBasic.SheetX)

      // merge static sheet and classes 
      classes = classes ? deepMerges(false, {}, staticSheet, classes) : staticSheet

      const className: TBasic.Ruleset = toPlatformRuleSet(classNameX as TBasic.RulesetX)
      const style: TBasic.Ruleset = toPlatformRuleSet(styleX as TBasic.RulesetX)

      const codeProps = {
        ...other, ...(window.isWeb ? $web : $native),
        classes,
        className,
        style,
        mergeRulesetWithOverrides
      } as TBasic.CodeProps<R>

      //console.log(JSON.stringify(codeProps))

      toPlatformEvents($web, $native as TBasic.OnPressAllNative, { onPress, onLongPress, onPressIn, onPressOut }, codeProps)

      return <Component {...codeProps} />
    }

  }

  return Styled as React.ComponentType<TBasic.PropsX<R>>

}

const mergeRulesetWithOverrides = (...rulesets/*all used rulesets*/) => {
  const rulesetResult = rulesets.filter(r => !!r)
  let res
  switch (rulesetResult.length) {
    case 0: res = {}; break
    case 1: res = rulesetResult[0]; break
    default: res = deepMerges(true, {}, ...rulesetResult); break
  }
  delete res.$mediaq
  return res
}

const clearSystemProps = obj => {
  if (!obj) return obj
  const { $overrides, $name, $web, $native, $mediaq, ...rest } = obj as TBasic.RulesetX
  return rest
}

