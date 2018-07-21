
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { InputAdornmentClassKey, InputAdornmentProps } from '../../mui/InputAdornment/InputAdornment';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<InputAdornmentClassKey>,
  props: InputAdornmentProps,
  theme: Theme
}>
