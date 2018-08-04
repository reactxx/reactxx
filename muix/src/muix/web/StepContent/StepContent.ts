
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/StepContent/StepContent';
import { styles, StepContent, defaultProps } from 'reactxx-mui-web/StepContent/StepContent'
            
export const StepContentCreator = withStylesCreator<Shape>(styles, StepContent, {
  isMui: true,
  defaultProps
});
const StepContentComponent = StepContentCreator();
if (StepContent['muiName']) StepContentComponent['muiName'] = StepContent['muiName']
export default StepContentComponent;
