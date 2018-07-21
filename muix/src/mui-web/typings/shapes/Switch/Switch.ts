
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { SwitchClassKey, SwitchProps } from '../../mui/Switch/Switch';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<SwitchClassKey>,
  props: SwitchProps,
  theme: Theme
}>
