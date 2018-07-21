
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { FormHelperTextClassKey, FormHelperTextProps } from '../../mui/FormHelperText/FormHelperText';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<FormHelperTextClassKey>,
  props: FormHelperTextProps,
  theme: Theme
}>
