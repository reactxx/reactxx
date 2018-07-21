
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TypographyClassKey, TypographyProps } from '../../mui/Typography/Typography';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TypographyClassKey>,
  props: TypographyProps,
  theme: Theme
}>
