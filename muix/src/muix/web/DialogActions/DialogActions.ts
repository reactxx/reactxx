
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/DialogActions/DialogActions';
import { styles, DialogActions, defaultProps } from 'reactxx-mui-web/DialogActions/DialogActions'
            
export const DialogActionsCreator = withStylesCreator<Shape>(styles, DialogActions, {
  isMui: true,
  defaultProps
});
const DialogActionsComponent = DialogActionsCreator();
if (DialogActions['muiName']) DialogActionsComponent['muiName'] = DialogActions['muiName']
export default DialogActionsComponent;
