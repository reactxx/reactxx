//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------


import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import { Theme } from '../styles/withStyles';
import { CardContentClassKey, CardContentProps } from './CardContent_';

export * from './CardContent_';
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CardContentClassKey>,
  props: CardContentProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export declare const styles: SheetCreatorX
export declare const defaultProps: PropsX
export declare const CardContentCode: CodeComponentType

declare const CardContent: React.Component<PropsX>
export default CardContent
