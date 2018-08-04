
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/FormControl/FormControl';
import { styles, FormControl, defaultProps } from 'reactxx-mui-web/FormControl/FormControl'
            
export const FormControlCreator = withStylesCreator<Shape>(styles, FormControl, {
  isMui: true,
  defaultProps
});
const FormControlComponent = FormControlCreator();
if (FormControl['muiName']) FormControlComponent['muiName'] = FormControl['muiName']
export default FormControlComponent;
