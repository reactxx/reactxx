
import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import { Theme } from '../styles/withStyles';
import { ButtonClassKey, ButtonProps } from '../mui-typings/Button/Button';

export { ButtonProps } from '../mui-typings/Button/Button';
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonClassKey>,
  props: ButtonProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export declare const styles: SheetCreatorX
export declare const defaultProps: PropsX
export declare const ButtonCode: CodeComponentType

declare const Button: React.Component<PropsX>
export default Button
