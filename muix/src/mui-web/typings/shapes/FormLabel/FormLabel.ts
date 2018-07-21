
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { FormLabelClassKey, FormLabelProps } from '../../mui/FormLabel/FormLabel';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<FormLabelClassKey>,
  props: FormLabelProps,
  theme: Theme
}>
