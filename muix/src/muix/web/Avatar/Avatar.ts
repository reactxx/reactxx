
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Avatar/Avatar';
import { styles, Avatar, defaultProps } from 'reactxx-mui-web/Avatar/Avatar'
            
export const AvatarCreator = withStylesCreator<Shape>(styles, Avatar, {
  isMui: true,
  defaultProps
});
const AvatarComponent = AvatarCreator();
if (Avatar['muiName']) AvatarComponent['muiName'] = Avatar['muiName']
export default AvatarComponent;
