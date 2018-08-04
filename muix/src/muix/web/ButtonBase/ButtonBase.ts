
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ButtonBase/ButtonBase';
import { styles, ButtonBase, defaultProps } from 'reactxx-mui-web/ButtonBase/ButtonBase'
            
export const ButtonBaseCreator = withStylesCreator<Shape>(styles, ButtonBase, {
  isMui: true,
  defaultProps
});
const ButtonBaseComponent = ButtonBaseCreator();
if (ButtonBase['muiName']) ButtonBaseComponent['muiName'] = ButtonBase['muiName']
export default ButtonBaseComponent;
