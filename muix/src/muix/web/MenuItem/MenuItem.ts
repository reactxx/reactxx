
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/MenuItem/MenuItem';
import { styles, MenuItem, defaultProps } from 'reactxx-mui-web/MenuItem/MenuItem'
            
export const MenuItemCreator = withStylesCreator<Shape>(styles, MenuItem, {
  isMui: true,
  defaultProps
});
const MenuItemComponent = MenuItemCreator();
if (MenuItem['muiName']) MenuItemComponent['muiName'] = MenuItem['muiName']
export default MenuItemComponent;
