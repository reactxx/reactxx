
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ListItem/ListItem';
import { styles, ListItem, defaultProps } from 'reactxx-mui-web/ListItem/ListItem'
            
export const ListItemCreator = withStylesCreator<Shape>(styles, ListItem, {
  isMui: true,
  defaultProps
});
const ListItemComponent = ListItemCreator();
if (ListItem['muiName']) ListItemComponent['muiName'] = ListItem['muiName']
export default ListItemComponent;
