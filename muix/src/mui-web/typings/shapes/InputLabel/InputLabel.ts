
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { InputLabelClassKey, InputLabelProps } from '../../mui/InputLabel/InputLabel';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<InputLabelClassKey>,
  props: InputLabelProps,
  theme: Theme
}>
