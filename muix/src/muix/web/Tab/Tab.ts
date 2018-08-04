
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Tab/Tab';
import { styles, Tab, defaultProps } from 'reactxx-mui-web/Tab/Tab'
            
export const TabCreator = withStylesCreator<Shape>(styles, Tab, {
  isMui: true,
  defaultProps
});
const TabComponent = TabCreator();
if (Tab['muiName']) TabComponent['muiName'] = Tab['muiName']
export default TabComponent;
