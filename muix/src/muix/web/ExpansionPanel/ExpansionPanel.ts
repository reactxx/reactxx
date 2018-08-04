
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ExpansionPanel/ExpansionPanel';
import { styles, ExpansionPanel, defaultProps } from 'reactxx-mui-web/ExpansionPanel/ExpansionPanel'
            
export const ExpansionPanelCreator = withStylesCreator<Shape>(styles, ExpansionPanel, {
  isMui: true,
  defaultProps
});
const ExpansionPanelComponent = ExpansionPanelCreator();
if (ExpansionPanel['muiName']) ExpansionPanelComponent['muiName'] = ExpansionPanel['muiName']
export default ExpansionPanelComponent;
