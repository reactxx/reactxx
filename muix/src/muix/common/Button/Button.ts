import { TCommon, Types } from 'reactxx-basic';
import { ButtonClassKey, ButtonProps } from '../../typings/Button/Button';
import { Theme } from '../../web/styles/withStyles';

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonClassKey>,
  props: ButtonProps,
  theme: Theme
}>


