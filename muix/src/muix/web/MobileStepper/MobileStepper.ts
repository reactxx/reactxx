
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/MobileStepper/MobileStepper';
import { styles, MobileStepper, defaultProps } from 'reactxx-mui-web/MobileStepper/MobileStepper'
            
export const MobileStepperCreator = withStylesCreator<Shape>(styles, MobileStepper, {
  isMui: true,
  defaultProps
});
const MobileStepperComponent = MobileStepperCreator();
if (MobileStepper['muiName']) MobileStepperComponent['muiName'] = MobileStepper['muiName']
export default MobileStepperComponent;
