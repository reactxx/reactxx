
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/DialogContentText/DialogContentText';
import { styles, DialogContentText, defaultProps } from 'reactxx-mui-web/DialogContentText/DialogContentText'
            
export const DialogContentTextCreator = withStylesCreator<Shape>(styles, DialogContentText, {
  isMui: true,
  defaultProps
});
const DialogContentTextComponent = DialogContentTextCreator();
if (DialogContentText['muiName']) DialogContentTextComponent['muiName'] = DialogContentText['muiName']
export default DialogContentTextComponent;
