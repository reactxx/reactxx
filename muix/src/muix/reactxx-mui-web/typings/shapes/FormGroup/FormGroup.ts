
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { FormGroupClassKey, FormGroupProps } from '../../mui/FormGroup/FormGroup';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<FormGroupClassKey>,
  props: FormGroupProps,
  theme: Theme
}>
