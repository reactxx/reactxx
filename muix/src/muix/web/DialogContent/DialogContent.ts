
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/DialogContent/DialogContent';
import { styles, DialogContent, defaultProps } from 'reactxx-mui-web/DialogContent/DialogContent'
            
export const DialogContentCreator = withStylesCreator<Shape>(styles, DialogContent, {
  isMui: true,
  defaultProps
});
const DialogContentComponent = DialogContentCreator();
if (DialogContent['muiName']) DialogContentComponent['muiName'] = DialogContent['muiName']
export default DialogContentComponent;
