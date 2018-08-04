
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Stepper/Stepper';
import { styles, Stepper, defaultProps } from 'reactxx-mui-web/Stepper/Stepper'
            
export const StepperCreator = withStylesCreator<Shape>(styles, Stepper, {
  isMui: true,
  defaultProps
});
const StepperComponent = StepperCreator();
if (Stepper['muiName']) StepperComponent['muiName'] = Stepper['muiName']
export default StepperComponent;
