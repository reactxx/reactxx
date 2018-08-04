
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/IconButton/IconButton';
import { styles, IconButton, defaultProps } from 'reactxx-mui-web/IconButton/IconButton'
            
export const IconButtonCreator = withStylesCreator<Shape>(styles, IconButton, {
  isMui: true,
  defaultProps
});
const IconButtonComponent = IconButtonCreator();
if (IconButton['muiName']) IconButtonComponent['muiName'] = IconButton['muiName']
export default IconButtonComponent;
