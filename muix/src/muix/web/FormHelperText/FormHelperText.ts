
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/FormHelperText/FormHelperText';
import { styles, FormHelperText, defaultProps } from 'reactxx-mui-web/FormHelperText/FormHelperText'
            
export const FormHelperTextCreator = withStylesCreator<Shape>(styles, FormHelperText, {
  isMui: true,
  defaultProps
});
const FormHelperTextComponent = FormHelperTextCreator();
if (FormHelperText['muiName']) FormHelperTextComponent['muiName'] = FormHelperText['muiName']
export default FormHelperTextComponent;
