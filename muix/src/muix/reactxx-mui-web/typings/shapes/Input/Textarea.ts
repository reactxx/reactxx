
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { TextareaClassKey, TextareaProps } from '../../mui/Input/Textarea';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TextareaClassKey>,
  props: TextareaProps,
  theme: Theme
}>
