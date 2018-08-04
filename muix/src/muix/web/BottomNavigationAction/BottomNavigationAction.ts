
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/BottomNavigationAction/BottomNavigationAction';
import { styles, BottomNavigationAction, defaultProps } from 'reactxx-mui-web/BottomNavigationAction/BottomNavigationAction'
            
export const BottomNavigationActionCreator = withStylesCreator<Shape>(styles, BottomNavigationAction, {
  isMui: true,
  defaultProps
});
const BottomNavigationActionComponent = BottomNavigationActionCreator();
if (BottomNavigationAction['muiName']) BottomNavigationActionComponent['muiName'] = BottomNavigationAction['muiName']
export default BottomNavigationActionComponent;
