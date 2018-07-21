
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { HiddenCssProps } from '../../mui/Hidden/HiddenCss';

export type Shape = Types.OverwriteShape<{
  props: HiddenCssProps,
  theme: Theme
}>
