
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/SwitchBase/SwitchBase';
import { styles, SwitchBase, defaultProps } from 'reactxx-mui-web/SwitchBase/SwitchBase'
            
export const SwitchBaseCreator = withStylesCreator<Shape>(styles, SwitchBase, {
  isMui: true,
  defaultProps
});
const SwitchBaseComponent = SwitchBaseCreator();
if (SwitchBase['muiName']) SwitchBaseComponent['muiName'] = SwitchBase['muiName']
export default SwitchBaseComponent;
