
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ExpansionPanelDetails/ExpansionPanelDetails';
import { styles, ExpansionPanelDetails, defaultProps } from 'reactxx-mui-web/ExpansionPanelDetails/ExpansionPanelDetails'
            
export const ExpansionPanelDetailsCreator = withStylesCreator<Shape>(styles, ExpansionPanelDetails, {
  isMui: true,
  defaultProps
});
const ExpansionPanelDetailsComponent = ExpansionPanelDetailsCreator();
if (ExpansionPanelDetails['muiName']) ExpansionPanelDetailsComponent['muiName'] = ExpansionPanelDetails['muiName']
export default ExpansionPanelDetailsComponent;
