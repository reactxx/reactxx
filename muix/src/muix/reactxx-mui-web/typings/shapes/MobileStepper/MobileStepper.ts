
import { TCommon, Types } from 'reactxx-basic';
import { Theme } from '../../../styles/withStyles';
import { MobileStepperClassKey, MobileStepperProps } from '../../mui/MobileStepper/MobileStepper';
 
export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<MobileStepperClassKey>,
  props: MobileStepperProps,
  theme: Theme
}>
