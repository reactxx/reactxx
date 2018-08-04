
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/CircularProgress/CircularProgress';
import { styles, CircularProgress, defaultProps } from 'reactxx-mui-web/CircularProgress/CircularProgress'
            
export const CircularProgressCreator = withStylesCreator<Shape>(styles, CircularProgress, {
  isMui: true,
  defaultProps
});
const CircularProgressComponent = CircularProgressCreator();
if (CircularProgress['muiName']) CircularProgressComponent['muiName'] = CircularProgress['muiName']
export default CircularProgressComponent;
