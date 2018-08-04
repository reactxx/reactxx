
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ExpansionPanelSummary/ExpansionPanelSummary';
import { styles, ExpansionPanelSummary, defaultProps } from 'reactxx-mui-web/ExpansionPanelSummary/ExpansionPanelSummary'
            
export const ExpansionPanelSummaryCreator = withStylesCreator<Shape>(styles, ExpansionPanelSummary, {
  isMui: true,
  defaultProps
});
const ExpansionPanelSummaryComponent = ExpansionPanelSummaryCreator();
if (ExpansionPanelSummary['muiName']) ExpansionPanelSummaryComponent['muiName'] = ExpansionPanelSummary['muiName']
export default ExpansionPanelSummaryComponent;
