
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ButtonBaseClassKey, ButtonBaseProps } from '../../mui/ButtonBase/ButtonBase';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ButtonBaseClassKey>,
  props: ButtonBaseProps,
  theme: Theme
}>
