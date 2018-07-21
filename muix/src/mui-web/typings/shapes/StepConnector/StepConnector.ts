
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { StepConnectorProps } from '../../mui/StepConnector/StepConnector';

export type Shape = Types.OverwriteShape<{
  props: StepConnectorProps,
  theme: Theme
}>
