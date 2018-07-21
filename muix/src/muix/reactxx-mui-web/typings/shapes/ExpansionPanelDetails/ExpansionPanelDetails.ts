
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ExpansionPanelDetailsClassKey, ExpansionPanelDetailsProps } from '../../mui/ExpansionPanelDetails/ExpansionPanelDetails';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ExpansionPanelDetailsClassKey>,
  props: ExpansionPanelDetailsProps,
  theme: Theme
}>
