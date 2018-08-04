
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Tabs/Tabs';
import { styles, Tabs, defaultProps } from 'reactxx-mui-web/Tabs/Tabs'
            
export const TabsCreator = withStylesCreator<Shape>(styles, Tabs, {
  isMui: true,
  defaultProps
});
const TabsComponent = TabsCreator();
if (Tabs['muiName']) TabsComponent['muiName'] = Tabs['muiName']
export default TabsComponent;
