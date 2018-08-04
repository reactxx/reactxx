
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ExpansionPanelActions/ExpansionPanelActions';
import { styles, ExpansionPanelActions, defaultProps } from 'reactxx-mui-web/ExpansionPanelActions/ExpansionPanelActions'
            
export const ExpansionPanelActionsCreator = withStylesCreator<Shape>(styles, ExpansionPanelActions, {
  isMui: true,
  defaultProps
});
const ExpansionPanelActionsComponent = ExpansionPanelActionsCreator();
if (ExpansionPanelActions['muiName']) ExpansionPanelActionsComponent['muiName'] = ExpansionPanelActions['muiName']
export default ExpansionPanelActionsComponent;
