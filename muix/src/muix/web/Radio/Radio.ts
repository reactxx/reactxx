
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Radio/Radio';
import { styles, Radio, defaultProps } from 'reactxx-mui-web/Radio/Radio'
            
export const RadioCreator = withStylesCreator<Shape>(styles, Radio, {
  isMui: true,
  defaultProps
});
const RadioComponent = RadioCreator();
if (Radio['muiName']) RadioComponent['muiName'] = Radio['muiName']
export default RadioComponent;
