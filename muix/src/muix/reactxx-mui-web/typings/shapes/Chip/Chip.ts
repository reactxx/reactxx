
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ChipClassKey, ChipProps } from '../../mui/Chip/Chip';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ChipClassKey>,
  props: ChipProps,
  theme: Theme
}>
