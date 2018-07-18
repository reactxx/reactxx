import { default as Button } from 'material-ui/Button/Button';
import React from 'react';
import { TCommon, TProvider, Types } from 'reactxx-basic';
import { ButtonClassKey, ButtonProps } from '../../typings/Button/Button';
import { Theme } from '../styles/withStyles';

type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonClassKey>,
  props: ButtonProps,
  theme: Theme
}>

export default Button as any as React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>

