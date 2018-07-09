import { default as Button, styles } from 'material-ui/Button/Button';
import React from 'react';
import { TCommon, TProvider, Types } from 'reactxx-basic';
import { ButtonClassKey, ButtonProps } from '../../typings/Button/Button';
import { Theme } from '../styles/withStyles';



type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonClassKey>,
  props: ButtonProps,
  theme: Theme
}>


let x: Types.SheetX<Shape>

const sheet: Types.SheetCreatorX<Shape> = theme => styles as any as Types.SheetX<Shape>

export default Button as React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>

