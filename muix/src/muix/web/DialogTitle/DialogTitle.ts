
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/DialogTitle/DialogTitle';
import { styles, DialogTitle, defaultProps } from 'reactxx-mui-web/DialogTitle/DialogTitle'
            
export const DialogTitleCreator = withStylesCreator<Shape>(styles, DialogTitle, {
  isMui: true,
  defaultProps
});
const DialogTitleComponent = DialogTitleCreator();
if (DialogTitle['muiName']) DialogTitleComponent['muiName'] = DialogTitle['muiName']
export default DialogTitleComponent;
