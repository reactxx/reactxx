
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { FormControlLabelClassKey, FormControlLabelProps } from '../../mui/FormControlLabel/FormControlLabel';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<FormControlLabelClassKey>,
  props: FormControlLabelProps,
  theme: Theme
}>
