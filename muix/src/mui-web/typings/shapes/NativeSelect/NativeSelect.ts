
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { NativeSelectClassKey, NativeSelectProps } from '../../mui/NativeSelect/NativeSelect';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<NativeSelectClassKey>,
  props: NativeSelectProps,
  theme: Theme
}>
