
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Icon/Icon';
import { styles, Icon, defaultProps } from 'reactxx-mui-web/Icon/Icon'
            
export const IconCreator = withStylesCreator<Shape>(styles, Icon, {
  isMui: true,
  defaultProps
});
const IconComponent = IconCreator();
if (Icon['muiName']) IconComponent['muiName'] = Icon['muiName']
export default IconComponent;
