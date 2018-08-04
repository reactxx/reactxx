
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Select/Select';
import { styles, Select, defaultProps } from 'reactxx-mui-web/Select/Select'
            
export const SelectCreator = withStylesCreator<Shape>(styles, Select, {
  isMui: true,
  defaultProps
});
const SelectComponent = SelectCreator();
if (Select['muiName']) SelectComponent['muiName'] = Select['muiName']
export default SelectComponent;
