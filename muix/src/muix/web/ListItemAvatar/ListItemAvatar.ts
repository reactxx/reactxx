
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/ListItemAvatar/ListItemAvatar';
import { styles, ListItemAvatar, defaultProps } from 'reactxx-mui-web/ListItemAvatar/ListItemAvatar'
            
export const ListItemAvatarCreator = withStylesCreator<Shape>(styles, ListItemAvatar, {
  isMui: true,
  defaultProps
});
const ListItemAvatarComponent = ListItemAvatarCreator();
if (ListItemAvatar['muiName']) ListItemAvatarComponent['muiName'] = ListItemAvatar['muiName']
export default ListItemAvatarComponent;
