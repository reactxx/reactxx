
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Step/Step';
import { styles, Step, defaultProps } from 'reactxx-mui-web/Step/Step'
            
export const StepCreator = withStylesCreator<Shape>(styles, Step, {
  isMui: true,
  defaultProps
});
const StepComponent = StepCreator();
if (Step['muiName']) StepComponent['muiName'] = Step['muiName']
export default StepComponent;
