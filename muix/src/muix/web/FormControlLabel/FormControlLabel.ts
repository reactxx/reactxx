
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/FormControlLabel/FormControlLabel';
import { styles, FormControlLabel, defaultProps } from 'reactxx-mui-web/FormControlLabel/FormControlLabel'
            
export const FormControlLabelCreator = withStylesCreator<Shape>(styles, FormControlLabel, {
  isMui: true,
  defaultProps
});
const FormControlLabelComponent = FormControlLabelCreator();
if (FormControlLabel['muiName']) FormControlLabelComponent['muiName'] = FormControlLabel['muiName']
export default FormControlLabelComponent;
