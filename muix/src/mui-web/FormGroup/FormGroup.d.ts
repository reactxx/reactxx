//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.4.3 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------


import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import { Theme } from '../styles/withStyles';
import { FormGroupClassKey, FormGroupProps } from './FormGroup_';

export * from './FormGroup_';
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<FormGroupClassKey>,
  props: FormGroupProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export declare const styles: SheetCreatorX
export declare const defaultProps: PropsX
export declare const FormGroupCode: CodeComponentType

declare const FormGroup: React.ComponentType<PropsX>
export default FormGroup
