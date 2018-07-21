
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ExpansionPanelClassKey, ExpansionPanelProps } from '../../mui/ExpansionPanel/ExpansionPanel';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ExpansionPanelClassKey>,
  props: ExpansionPanelProps,
  theme: Theme
}>
