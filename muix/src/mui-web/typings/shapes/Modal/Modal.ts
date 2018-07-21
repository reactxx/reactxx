
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { ModalClassKey, ModalProps } from '../../mui/Modal/Modal';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<ModalClassKey>,
  props: ModalProps,
  theme: Theme
}>
