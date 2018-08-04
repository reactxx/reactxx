
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/InputLabel/InputLabel';
import { styles, InputLabel, defaultProps } from 'reactxx-mui-web/InputLabel/InputLabel'
            
export const InputLabelCreator = withStylesCreator<Shape>(styles, InputLabel, {
  isMui: true,
  defaultProps
});
const InputLabelComponent = InputLabelCreator();
if (InputLabel['muiName']) InputLabelComponent['muiName'] = InputLabel['muiName']
export default InputLabelComponent;
