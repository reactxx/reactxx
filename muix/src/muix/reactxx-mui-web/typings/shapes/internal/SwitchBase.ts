
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { SwitchBaseClassKey, SwitchBaseProps } from '../../mui/internal/SwitchBase';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<SwitchBaseClassKey>,
  props: SwitchBaseProps,
  theme: Theme
}>
