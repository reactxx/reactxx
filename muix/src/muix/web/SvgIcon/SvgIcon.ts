
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/SvgIcon/SvgIcon';
import { styles, SvgIcon, defaultProps } from 'reactxx-mui-web/SvgIcon/SvgIcon'
            
export const SvgIconCreator = withStylesCreator<Shape>(styles, SvgIcon, {
  isMui: true,
  defaultProps
});
const SvgIconComponent = SvgIconCreator();
if (SvgIcon['muiName']) SvgIconComponent['muiName'] = SvgIcon['muiName']
export default SvgIconComponent;
