
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Drawer/Drawer';
import { styles, Drawer, defaultProps } from 'reactxx-mui-web/Drawer/Drawer'
            
export const DrawerCreator = withStylesCreator<Shape>(styles, Drawer, {
  isMui: true,
  defaultProps
});
const DrawerComponent = DrawerCreator();
if (Drawer['muiName']) DrawerComponent['muiName'] = Drawer['muiName']
export default DrawerComponent;
