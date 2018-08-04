
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TabScrollButton/TabScrollButton';
import { styles, TabScrollButton, defaultProps } from 'reactxx-mui-web/TabScrollButton/TabScrollButton'
            
export const TabScrollButtonCreator = withStylesCreator<Shape>(styles, TabScrollButton, {
  isMui: true,
  defaultProps
});
const TabScrollButtonComponent = TabScrollButtonCreator();
if (TabScrollButton['muiName']) TabScrollButtonComponent['muiName'] = TabScrollButton['muiName']
export default TabScrollButtonComponent;
