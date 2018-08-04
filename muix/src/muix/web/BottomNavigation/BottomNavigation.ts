
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/BottomNavigation/BottomNavigation';
import { styles, BottomNavigation, defaultProps } from 'reactxx-mui-web/BottomNavigation/BottomNavigation'
            
export const BottomNavigationCreator = withStylesCreator<Shape>(styles, BottomNavigation, {
  isMui: true,
  defaultProps
});
const BottomNavigationComponent = BottomNavigationCreator();
if (BottomNavigation['muiName']) BottomNavigationComponent['muiName'] = BottomNavigation['muiName']
export default BottomNavigationComponent;
