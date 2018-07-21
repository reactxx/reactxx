
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ExpansionPanelActionsClassKey, ExpansionPanelActionsProps } from '../../mui/ExpansionPanelActions/ExpansionPanelActions';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ExpansionPanelActionsClassKey>,
  props: ExpansionPanelActionsProps,
  theme: Theme
}>
