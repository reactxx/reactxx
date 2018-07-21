
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TabIndicatorClassKey, TabIndicatorProps } from '../../mui/Tabs/TabIndicator';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TabIndicatorClassKey>,
  props: TabIndicatorProps,
  theme: Theme
}>
