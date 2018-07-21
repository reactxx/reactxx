
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { SelectClassKey, SelectProps } from '../../mui/Select/Select';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<SelectClassKey>,
  props: SelectProps,
  theme: Theme
}>
