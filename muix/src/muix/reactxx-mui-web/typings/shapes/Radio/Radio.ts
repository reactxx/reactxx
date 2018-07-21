
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { RadioClassKey, RadioProps } from '../../mui/Radio/Radio';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<RadioClassKey>,
  props: RadioProps,
  theme: Theme
}>
