import React from 'react'
import { TSheeter } from '../index-d'
import { adjustSheet } from '../extend-reacts/adjust-sheet'
import { classNamesForBind } from '../extend-reacts/class-names'


export const withStyles = <R extends TSheeter.Shape = TSheeter.Shape>
  (sheet: TSheeter.Sheet<R>, Component: TSheeter.SFCCode<R>, defaultProps?: TSheeter.Props<R>) => {
  const res: React.SFC<TSheeter.Props<R>> = (props: TSheeter.Props) => {
    const codeProps = { ...props } as TSheeter.PropsCode
    // include sheet to props
    codeProps.classes = adjustSheet(sheet, props.classes)
    codeProps.sheetQuery = { whenUsed: {} }
    codeProps.classNames = classNamesForBind.bind(codeProps)
    // normalize events
    // TODO
    return <Component {...codeProps as TSheeter.PropsCode<R>} />
  }
  res.defaultProps = defaultProps
  return res
}