
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/GridList/GridList';
import { styles, GridList, defaultProps } from 'reactxx-mui-web/GridList/GridList'
            
export const GridListCreator = withStylesCreator<Shape>(styles, GridList, {
  isMui: true,
  defaultProps
});
const GridListComponent = GridListCreator();
if (GridList['muiName']) GridListComponent['muiName'] = GridList['muiName']
export default GridListComponent;
