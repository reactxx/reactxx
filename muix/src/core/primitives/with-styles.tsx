import React from 'react'
import { TSheeter } from '../typings'
import { adjustSheet } from '../extend-reacts/adjust-sheet'


export const withStyles = <R extends TSheeter.Shape = TSheeter.Shape>
  (sheet: TSheeter.Sheet<R>, Component: TSheeter.SFCCode<R>, defaultProps?: TSheeter.Props<R>) => {
  const res: React.SFC<TSheeter.Props<R>> = (props: TSheeter.Props) => {
    props = { ...props }
    // include sheet to props
    props.classes = adjustSheet(sheet, props.classes)
    // normalize events
    // TODO
    // return Component
    return <Component {...props as TSheeter.PropsCode<R>} />
  }
  res.defaultProps = defaultProps
  return res
}