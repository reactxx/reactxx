import {TSheeter} from './sheeter'
import {TCompiler} from './compiled'

/* cross platform common styling attributes 
 the same props has: 
 - react web HTML elements (e.g. <div classNameX={....}), 
 - react native build in components (e.g. <Text styleX={})
 - custom components 
 */
export interface CommonProperties {
  classNameX?: ClassName
  styleX?: TSheeter.Style
}

export type ClassNameItem = TSheeter.Ruleset | TCompiler.Ruleset | TCompiler.Values
export type ClassName = ClassNameItem | ClassNameItem[]

