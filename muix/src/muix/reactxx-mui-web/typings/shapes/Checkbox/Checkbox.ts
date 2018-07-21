
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CheckboxClassKey, CheckboxProps } from '../../mui/Checkbox/Checkbox';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CheckboxClassKey>,
  props: CheckboxProps,
  theme: Theme
}>
