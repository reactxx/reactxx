
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Popover/Popover';
import { styles, Popover, defaultProps } from 'reactxx-mui-web/Popover/Popover'
            
export const PopoverCreator = withStylesCreator<Shape>(styles, Popover, {
  isMui: true,
  defaultProps
});
const PopoverComponent = PopoverCreator();
if (Popover['muiName']) PopoverComponent['muiName'] = Popover['muiName']
export default PopoverComponent;
