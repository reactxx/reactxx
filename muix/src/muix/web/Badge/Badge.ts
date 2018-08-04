
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Badge/Badge';
import { styles, Badge, defaultProps } from 'reactxx-mui-web/Badge/Badge'
            
export const BadgeCreator = withStylesCreator<Shape>(styles, Badge, {
  isMui: true,
  defaultProps
});
const BadgeComponent = BadgeCreator();
if (Badge['muiName']) BadgeComponent['muiName'] = Badge['muiName']
export default BadgeComponent;
