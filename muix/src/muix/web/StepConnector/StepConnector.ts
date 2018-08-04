
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/StepConnector/StepConnector';
import { styles, StepConnector, defaultProps } from 'reactxx-mui-web/StepConnector/StepConnector'
            
export const StepConnectorCreator = withStylesCreator<Shape>(styles, StepConnector, {
  isMui: true,
  defaultProps
});
const StepConnectorComponent = StepConnectorCreator();
if (StepConnector['muiName']) StepConnectorComponent['muiName'] = StepConnector['muiName']
export default StepConnectorComponent;
