
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { PaperClassKey, PaperProps } from '../../mui/Paper/Paper';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<PaperClassKey>,
  props: PaperProps,
  theme: Theme
}>
