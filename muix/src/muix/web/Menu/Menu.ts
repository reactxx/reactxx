
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Menu/Menu';
import { styles, Menu, defaultProps } from 'reactxx-mui-web/Menu/Menu'
            
export const MenuCreator = withStylesCreator<Shape>(styles, Menu, {
  isMui: true,
  defaultProps
});
const MenuComponent = MenuCreator();
if (Menu['muiName']) MenuComponent['muiName'] = Menu['muiName']
export default MenuComponent;
