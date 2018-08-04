
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/FormGroup/FormGroup';
import { styles, FormGroup, defaultProps } from 'reactxx-mui-web/FormGroup/FormGroup'
            
export const FormGroupCreator = withStylesCreator<Shape>(styles, FormGroup, {
  isMui: true,
  defaultProps
});
const FormGroupComponent = FormGroupCreator();
if (FormGroup['muiName']) FormGroupComponent['muiName'] = FormGroup['muiName']
export default FormGroupComponent;
