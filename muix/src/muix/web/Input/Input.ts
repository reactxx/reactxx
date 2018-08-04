
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Input/Input';
import { styles, Input, defaultProps } from 'reactxx-mui-web/Input/Input'
            
export const InputCreator = withStylesCreator<Shape>(styles, Input, {
  isMui: true,
  defaultProps
});
const InputComponent = InputCreator();
if (Input['muiName']) InputComponent['muiName'] = Input['muiName']
export default InputComponent;
