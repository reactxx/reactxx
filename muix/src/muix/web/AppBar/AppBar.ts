
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/AppBar/AppBar';
import { styles, AppBar, defaultProps } from 'reactxx-mui-web/AppBar/AppBar'
            
export const AppBarCreator = withStylesCreator<Shape>(styles, AppBar, {
  isMui: true,
  defaultProps
});
const AppBarComponent = AppBarCreator();
if (AppBar['muiName']) AppBarComponent['muiName'] = AppBar['muiName']
export default AppBarComponent;
