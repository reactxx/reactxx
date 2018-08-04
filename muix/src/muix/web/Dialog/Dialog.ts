
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Dialog/Dialog';
import { styles, Dialog, defaultProps } from 'reactxx-mui-web/Dialog/Dialog'
            
export const DialogCreator = withStylesCreator<Shape>(styles, Dialog, {
  isMui: true,
  defaultProps
});
const DialogComponent = DialogCreator();
if (Dialog['muiName']) DialogComponent['muiName'] = Dialog['muiName']
export default DialogComponent;
