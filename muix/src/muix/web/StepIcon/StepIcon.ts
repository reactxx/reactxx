
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/StepIcon/StepIcon';
import { styles, StepIcon, defaultProps } from 'reactxx-mui-web/StepIcon/StepIcon'
            
export const StepIconCreator = withStylesCreator<Shape>(styles, StepIcon, {
  isMui: true,
  defaultProps
});
const StepIconComponent = StepIconCreator();
if (StepIcon['muiName']) StepIconComponent['muiName'] = StepIcon['muiName']
export default StepIconComponent;
