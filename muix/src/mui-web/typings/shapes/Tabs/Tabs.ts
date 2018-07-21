
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TabsClassKey, TabsProps } from '../../mui/Tabs/Tabs';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TabsClassKey>,
  props: TabsProps,
  theme: Theme
}>
