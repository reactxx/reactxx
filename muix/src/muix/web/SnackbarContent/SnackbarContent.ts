
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/SnackbarContent/SnackbarContent';
import { styles, SnackbarContent, defaultProps } from 'reactxx-mui-web/SnackbarContent/SnackbarContent'
            
export const SnackbarContentCreator = withStylesCreator<Shape>(styles, SnackbarContent, {
  isMui: true,
  defaultProps
});
const SnackbarContentComponent = SnackbarContentCreator();
if (SnackbarContent['muiName']) SnackbarContentComponent['muiName'] = SnackbarContent['muiName']
export default SnackbarContentComponent;
