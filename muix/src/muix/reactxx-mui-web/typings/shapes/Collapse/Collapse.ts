
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { CollapseClassKey, CollapseProps } from '../../mui/Collapse/Collapse';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<CollapseClassKey>,
  props: CollapseProps,
  theme: Theme
}>
