
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TabClassKey, TabProps } from '../../mui/Tab/Tab';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TabClassKey>,
  props: TabProps,
  theme: Theme
}>
