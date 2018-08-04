
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Collapse/Collapse';
import { styles, Collapse, defaultProps } from 'reactxx-mui-web/Collapse/Collapse'
            
export const CollapseCreator = withStylesCreator<Shape>(styles, Collapse, {
  isMui: true,
  defaultProps
});
const CollapseComponent = CollapseCreator();
if (Collapse['muiName']) CollapseComponent['muiName'] = Collapse['muiName']
export default CollapseComponent;
