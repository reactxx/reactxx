
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Snackbar/Snackbar';
import { styles, Snackbar, defaultProps } from 'reactxx-mui-web/Snackbar/Snackbar'
            
export const SnackbarCreator = withStylesCreator<Shape>(styles, Snackbar, {
  isMui: true,
  defaultProps
});
const SnackbarComponent = SnackbarCreator();
if (Snackbar['muiName']) SnackbarComponent['muiName'] = Snackbar['muiName']
export default SnackbarComponent;
