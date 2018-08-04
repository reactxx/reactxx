
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Tooltip/Tooltip';
import { styles, Tooltip, defaultProps } from 'reactxx-mui-web/Tooltip/Tooltip'
            
export const TooltipCreator = withStylesCreator<Shape>(styles, Tooltip, {
  isMui: true,
  defaultProps
});
const TooltipComponent = TooltipCreator();
if (Tooltip['muiName']) TooltipComponent['muiName'] = Tooltip['muiName']
export default TooltipComponent;
