import React, { memo } from 'react';
import { deepMerges, platform } from 'reactxx-sheeter';
import { TAtomize, TComponents, TSheeter, TWithStyles, TVariants } from 'reactxx-typings';

import { useTheme } from './hooks/theme'

export const useReactxxCreator = <R extends TSheeter.Shape>(
  sheetOrCreator: TSheeter.SheetOrCreator<R>,
  CodeComponent: TComponents.ComponentTypeCode<R>,
  options?: TWithStyles.ComponentOptions<R>
) => (
  overridedOptions?: TWithStyles.ComponentOptions<R>
) => {
    const res = finishComponentState(sheetOrCreator, CodeComponent, options, overridedOptions)
    return useReactxxCreatorLow(res)
  }

const useComp = useReactxxCreator<TSheeter.Shape>(null, null, null)(null)
const Comp = memo(props => {
  const { theme, classes, classNameX, styleX, toClassNames } = useComp(props)
})

//*********************************************************
//  PRIVATE
//*********************************************************


const useReactxxCreatorLow = (options: TWithStyles.ComponentOptions) => (props: TComponents.Props) => {
  const theme = options.withTheme ? useTheme() : null
  return { theme } as TComponents.PropsCode
}

const finishComponentState = (
  sheetOrCreator: TSheeter.SheetOrCreator, CodeComponent: TComponents.ComponentTypeCode,
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
    CodeComponent,
    withTheme: typeof mergedOptions.withTheme === 'boolean'
      ? mergedOptions.withTheme
      : typeof sheetOrCreator === 'function',
    displayName: `${mergedOptions.displayName || CodeComponent['name'] || 'Noname'}`,
  }

  if (!sheetOrCreator['$cacheId']) sheetOrCreator['$cacheId'] = ++componentTypeCounter
  if (overridedOptions) overridedOptions['$cacheId'] = ++componentTypeCounter

  CodeComponent.displayName = CodeComponent.displayName || res.displayName + 'Code'

  return res
}

let componentTypeCounter = 0 // counter of component types
let componentInstaneCounter = 0 // counter of component instances