
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/StepButton/StepButton';
import { styles, StepButton, defaultProps } from 'reactxx-mui-web/StepButton/StepButton'
            
export const StepButtonCreator = withStylesCreator<Shape>(styles, StepButton, {
  isMui: true,
  defaultProps
});
const StepButtonComponent = StepButtonCreator();
if (StepButton['muiName']) StepButtonComponent['muiName'] = StepButton['muiName']
export default StepButtonComponent;
