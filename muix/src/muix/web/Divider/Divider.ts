
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Divider/Divider';
import { styles, Divider, defaultProps } from 'reactxx-mui-web/Divider/Divider'
            
export const DividerCreator = withStylesCreator<Shape>(styles, Divider, {
  isMui: true,
  defaultProps
});
const DividerComponent = DividerCreator();
if (Divider['muiName']) DividerComponent['muiName'] = Divider['muiName']
export default DividerComponent;
