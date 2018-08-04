
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/LinearProgress/LinearProgress';
import { styles, LinearProgress, defaultProps } from 'reactxx-mui-web/LinearProgress/LinearProgress'
            
export const LinearProgressCreator = withStylesCreator<Shape>(styles, LinearProgress, {
  isMui: true,
  defaultProps
});
const LinearProgressComponent = LinearProgressCreator();
if (LinearProgress['muiName']) LinearProgressComponent['muiName'] = LinearProgress['muiName']
export default LinearProgressComponent;
