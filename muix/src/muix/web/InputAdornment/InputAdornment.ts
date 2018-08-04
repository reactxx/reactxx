
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/InputAdornment/InputAdornment';
import { styles, InputAdornment, defaultProps } from 'reactxx-mui-web/InputAdornment/InputAdornment'
            
export const InputAdornmentCreator = withStylesCreator<Shape>(styles, InputAdornment, {
  isMui: true,
  defaultProps
});
const InputAdornmentComponent = InputAdornmentCreator();
if (InputAdornment['muiName']) InputAdornmentComponent['muiName'] = InputAdornment['muiName']
export default InputAdornmentComponent;
