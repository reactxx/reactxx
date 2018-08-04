
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ListItemText/ListItemText';
import { styles, ListItemText, defaultProps } from 'reactxx-mui-web/ListItemText/ListItemText'
            
export const ListItemTextCreator = withStylesCreator<Shape>(styles, ListItemText, {
  isMui: true,
  defaultProps
});
const ListItemTextComponent = ListItemTextCreator();
if (ListItemText['muiName']) ListItemTextComponent['muiName'] = ListItemText['muiName']
export default ListItemTextComponent;
