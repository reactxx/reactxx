
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Button/Button';
import { styles, Button, defaultProps } from 'reactxx-mui-web/Button/Button'
            
export const ButtonCreator = withStylesCreator<Shape>(styles, Button, {
  isMui: true,
  defaultProps
});
const ButtonComponent = ButtonCreator();
if (Button['muiName']) ButtonComponent['muiName'] = Button['muiName']
export default ButtonComponent;
