
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ExpansionPanelSummaryClassKey, ExpansionPanelSummaryProps } from '../../mui/ExpansionPanelSummary/ExpansionPanelSummary';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ExpansionPanelSummaryClassKey>,
  props: ExpansionPanelSummaryProps,
  theme: Theme
}>
