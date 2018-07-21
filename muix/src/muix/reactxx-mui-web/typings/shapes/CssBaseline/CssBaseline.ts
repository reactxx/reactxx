
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CssBaselineClassKey, CssBaselineProps } from '../../mui/CssBaseline/CssBaseline';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CssBaselineClassKey>,
  props: CssBaselineProps,
  theme: Theme
}>
