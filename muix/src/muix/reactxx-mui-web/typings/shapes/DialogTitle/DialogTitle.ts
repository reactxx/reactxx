
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { DialogTitleClassKey, DialogTitleProps } from '../../mui/DialogTitle/DialogTitle';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<DialogTitleClassKey>,
  props: DialogTitleProps,
  theme: Theme
}>
