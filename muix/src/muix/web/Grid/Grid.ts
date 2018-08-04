
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Grid/Grid';
import { styles, Grid, defaultProps } from 'reactxx-mui-web/Grid/Grid'
            
export const GridCreator = withStylesCreator<Shape>(styles, Grid, {
  isMui: true,
  defaultProps
});
const GridComponent = GridCreator();
if (Grid['muiName']) GridComponent['muiName'] = Grid['muiName']
export default GridComponent;
