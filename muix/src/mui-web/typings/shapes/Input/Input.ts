
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { InputClassKey, InputProps } from '../../mui/Input/Input';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<InputClassKey>,
  props: InputProps,
  theme: Theme
}>
