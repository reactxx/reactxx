
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/GridListTileBar/GridListTileBar';
import { styles, GridListTileBar, defaultProps } from 'reactxx-mui-web/GridListTileBar/GridListTileBar'
            
export const GridListTileBarCreator = withStylesCreator<Shape>(styles, GridListTileBar, {
  isMui: true,
  defaultProps
});
const GridListTileBarComponent = GridListTileBarCreator();
if (GridListTileBar['muiName']) GridListTileBarComponent['muiName'] = GridListTileBar['muiName']
export default GridListTileBarComponent;
