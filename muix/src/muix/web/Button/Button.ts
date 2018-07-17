import { default as Button, styles } from 'material-ui/Button/Button';
import React from 'react';
import { TCommon, TProvider, Types } from 'reactxx-basic';
import { ButtonClassKey, ButtonProps } from 'reactxx-muix/typings/Button/Button';
import { Theme } from 'reactxx-muix/web/styles/withStyles';



type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonClassKey>,
  props: ButtonProps,
  theme: Theme
}>

const sheet: Types.SheetCreatorX<Shape> = theme => styles as any as Types.SheetX<Shape>

export default Button as any as React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>

