
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Checkbox/Checkbox';
import { styles, Checkbox, defaultProps } from 'reactxx-mui-web/Checkbox/Checkbox'
            
export const CheckboxCreator = withStylesCreator<Shape>(styles, Checkbox, {
  isMui: true,
  defaultProps
});
const CheckboxComponent = CheckboxCreator();
if (Checkbox['muiName']) CheckboxComponent['muiName'] = Checkbox['muiName']
export default CheckboxComponent;
