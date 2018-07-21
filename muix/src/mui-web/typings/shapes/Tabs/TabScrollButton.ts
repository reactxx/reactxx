
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TabScrollButtonClassKey, TabScrollButtonProps } from '../../mui/Tabs/TabScrollButton';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TabScrollButtonClassKey>,
  props: TabScrollButtonProps,
  theme: Theme
}>
