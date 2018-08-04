
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Toolbar/Toolbar';
import { styles, Toolbar, defaultProps } from 'reactxx-mui-web/Toolbar/Toolbar'
            
export const ToolbarCreator = withStylesCreator<Shape>(styles, Toolbar, {
  isMui: true,
  defaultProps
});
const ToolbarComponent = ToolbarCreator();
if (Toolbar['muiName']) ToolbarComponent['muiName'] = Toolbar['muiName']
export default ToolbarComponent;
