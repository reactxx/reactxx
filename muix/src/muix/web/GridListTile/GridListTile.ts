
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/GridListTile/GridListTile';
import { styles, GridListTile, defaultProps } from 'reactxx-mui-web/GridListTile/GridListTile'
            
export const GridListTileCreator = withStylesCreator<Shape>(styles, GridListTile, {
  isMui: true,
  defaultProps
});
const GridListTileComponent = GridListTileCreator();
if (GridListTile['muiName']) GridListTileComponent['muiName'] = GridListTile['muiName']
export default GridListTileComponent;
