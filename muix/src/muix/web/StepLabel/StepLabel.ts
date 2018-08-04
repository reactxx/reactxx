
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/StepLabel/StepLabel';
import { styles, StepLabel, defaultProps } from 'reactxx-mui-web/StepLabel/StepLabel'
            
export const StepLabelCreator = withStylesCreator<Shape>(styles, StepLabel, {
  isMui: true,
  defaultProps
});
const StepLabelComponent = StepLabelCreator();
if (StepLabel['muiName']) StepLabelComponent['muiName'] = StepLabel['muiName']
export default StepLabelComponent;
