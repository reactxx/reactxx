
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TouchRipple/TouchRipple';
import { styles, TouchRipple, defaultProps } from 'reactxx-mui-web/TouchRipple/TouchRipple'
            
export const TouchRippleCreator = withStylesCreator<Shape>(styles, TouchRipple, {
  isMui: true,
  defaultProps
});
const TouchRippleComponent = TouchRippleCreator();
if (TouchRipple['muiName']) TouchRippleComponent['muiName'] = TouchRipple['muiName']
export default TouchRippleComponent;
