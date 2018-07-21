import { TCommon, Types } from 'reactxx-basic';
import { ButtonBaseClassKey, ButtonBaseProps } from '../../typings/ButtonBase/ButtonBase';
import { Theme } from '../../web/styles/withStyles';

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonBaseClassKey>,
  props: ButtonBaseProps,
  theme: Theme
}>
