
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ListItemSecondaryAction/ListItemSecondaryAction';
import { styles, ListItemSecondaryAction, defaultProps } from 'reactxx-mui-web/ListItemSecondaryAction/ListItemSecondaryAction'
            
export const ListItemSecondaryActionCreator = withStylesCreator<Shape>(styles, ListItemSecondaryAction, {
  isMui: true,
  defaultProps
});
const ListItemSecondaryActionComponent = ListItemSecondaryActionCreator();
if (ListItemSecondaryAction['muiName']) ListItemSecondaryActionComponent['muiName'] = ListItemSecondaryAction['muiName']
export default ListItemSecondaryActionComponent;
