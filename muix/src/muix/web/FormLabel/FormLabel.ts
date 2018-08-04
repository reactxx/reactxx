
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/FormLabel/FormLabel';
import { styles, FormLabel, defaultProps } from 'reactxx-mui-web/FormLabel/FormLabel'
            
export const FormLabelCreator = withStylesCreator<Shape>(styles, FormLabel, {
  isMui: true,
  defaultProps
});
const FormLabelComponent = FormLabelCreator();
if (FormLabel['muiName']) FormLabelComponent['muiName'] = FormLabel['muiName']
export default FormLabelComponent;
