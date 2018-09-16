import React from 'react';
import { TWithStyles, TComponents } from '../index-d'
import { adjustSheet } from '../reacts/adjust-sheet'
import { classNamesForBind } from '../reacts/class-names'


export const lastPipe: TWithStyles.Pipe = (pipeId, context, next) => {
  const { pipeData } = context
  const codeProps: TComponents.PropsCode = {
    sheetQuery: context.sheetQuery,
    theme: context.theme,
  }
  codeProps.classNames = classNamesForBind.bind(codeProps)
  return () => <context.CodeComponent {...codeProps} />
}
