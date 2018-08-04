
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Switch/Switch';
import { styles, Switch, defaultProps } from 'reactxx-mui-web/Switch/Switch'
            
export const SwitchCreator = withStylesCreator<Shape>(styles, Switch, {
  isMui: true,
  defaultProps
});
const SwitchComponent = SwitchCreator();
if (Switch['muiName']) SwitchComponent['muiName'] = Switch['muiName']
export default SwitchComponent;
