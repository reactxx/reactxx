
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { FormControlClassKey, FormControlProps } from '../../mui/FormControl/FormControl';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<FormControlClassKey>,
  props: FormControlProps,
  theme: Theme
}>
