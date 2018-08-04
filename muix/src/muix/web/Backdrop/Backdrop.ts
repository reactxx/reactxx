
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Backdrop/Backdrop';
import { styles, Backdrop, defaultProps } from 'reactxx-mui-web/Backdrop/Backdrop'
            
export const BackdropCreator = withStylesCreator<Shape>(styles, Backdrop, {
  isMui: true,
  defaultProps
});
const BackdropComponent = BackdropCreator();
if (Backdrop['muiName']) BackdropComponent['muiName'] = Backdrop['muiName']
export default BackdropComponent;
