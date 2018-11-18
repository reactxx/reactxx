import React, { memo } from 'react';
//import {TextInput} from 'react-native'
import { deepMerges, platform } from 'reactxx-sheeter';
import { TAtomize, TComponents, TSheeter, TWithStyles, TVariants, TCommonStyles } from 'reactxx-typings';

import { useTheme } from './hooks/theme'

export const componentCreator = <R extends TSheeter.Shape>(
  sheetOrCreator: TSheeter.SheetOrCreator<R>,
  options: TWithStyles.ComponentOptions<R>,
  code: (props) => any,
) => (
  overridedOptions?: TWithStyles.ComponentOptions<R>
) => {

    const res = finishComponentState(sheetOrCreator, options, overridedOptions)
    return componentCreatorLow(res)
  }

interface TestShape {
  sheetExtraProps: {
    someCond
    color
    someWidth
  }
}

let $width

const themeDef = {
  primary: {},
  secondary: {},
  breakpoints: (() => {
    const [mobile, tablet, desktop] = $width.intervals(640, 1024)
    return { mobile, tablet, desktop }
  })()
}

interface Props<T> {
  $ifelse: <R extends {}>(cond: ($props: T) => boolean, ok: R | R[], wrong: R | R[]) => R
  $if: <R extends {}>(cond: ($props: T) => boolean, ok: R | R[]) => R
  $native: <R extends {}>(...args: R[]) => { $native: R}
  $hot
  $width: (<R extends {}>(width, ...args: R[]) => R) & { in }
  $web: (...arg: TCommonStyles.RulesetWeb[]) => { $web: TSheeter.RulesetWeb }
  $props
  $theme: typeof themeDef
}

const createConfig = <T extends {} = {}>(creator: (props: Props<T>) => {}) => {

}

interface TextCommon {
  tc?: string
}

interface Text extends TextCommon {
  t?: string
}

interface ViewCommon {
  vc?: string
}

interface View extends ViewCommon{
  v?: string
}
type W = TSheeter.RulesetWeb
type TC = TextCommon & { $web?: W; $native?: T}
type T = Text

const testConfig = createConfig<{ enabled, color }>(({ $theme, $ifelse, $if, $hot, $width, $web, $native }) => ({
  withTheme: true,
  defaultProps: {

  },
  sheet: {
    root: [
      $web({
        ':hover': $width<W>([640, 1024],{
          margin:0, color: ''
        })
      }),

      $width<TC>([640, 1024],
        $ifelse<TC>($props => $props.enabled && $width.in($theme.breakpoints.mobile),
          [
            $native<T>(
              { t: '' },
              $if<T>($props => true, { tc: '', t:'' }),
            ),
            $web(
              { },
              $if<W>($props => true, { color: 'red' }),
            )
          ],
          $if<TC>($props => true, { tc: '' }),
        ),
        {tc: ''}
      ),

      $width<TC>(1024, {

      }, {}),
      $hot(({ props: { primary, color } }) => [[primary], 
        primary ? $theme.primary : $theme.secondary,
        { color }
      ]),
    ],
  }
  
}))


const Test = props => {
  const query = useSheeterQuery(testConfig, props)
  query.$switch.pressable = false
  const { sheet, propsCode, toClassNames, style /*web only*/ } = useSheeter(testConfig, props)

  return null
}

let useSheeter, useSheeterQuery

//*********************************************************
//  PRIVATE
//*********************************************************


const componentCreatorLow = (options: TWithStyles.ComponentOptions) => (props: TComponents.Props) => {
  const theme = options.withTheme ? useTheme() : null
  return { theme, propsCode: null } as TComponents.PropsCode & { propsCode }
}

const finishComponentState = (
  sheetOrCreator: TSheeter.SheetOrCreator,
  options: TWithStyles.ComponentOptions, overridedOptions: TWithStyles.ComponentOptions
) => {
  if (options && options.defaultProps) {
    const { styleX, classes, classNameX, ...defRest } = options.defaultProps as any
    delete options.defaultProps
  }
  if (overridedOptions && overridedOptions.defaultProps) {
    const { styleX, classes, classNameX, ...defRest } = overridedOptions.defaultProps as any
    delete overridedOptions.defaultProps
  }

  const mergedOptions: TWithStyles.ComponentOptions = options && overridedOptions ?
    deepMerges({}, [options, overridedOptions]) : options ?
      options : overridedOptions ?
        overridedOptions : {}
  //const componentId = componentTypeCounter++

  const res: TWithStyles.ComponentOptions = {
    ...mergedOptions,
    sheetOrCreator,
    //componentId,
    withTheme: typeof mergedOptions.withTheme === 'boolean'
      ? mergedOptions.withTheme
      : typeof sheetOrCreator === 'function',
    displayName: `${mergedOptions.displayName || 'Noname'}`,
  }

  if (!sheetOrCreator['$cacheId']) sheetOrCreator['$cacheId'] = ++componentTypeCounter
  if (overridedOptions) overridedOptions['$cacheId'] = ++componentTypeCounter

  return res
}

let componentTypeCounter = 0 // counter of component types
let componentInstaneCounter = 0 // counter of component instances