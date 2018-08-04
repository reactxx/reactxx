
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/HiddenCss/HiddenCss';
import { styles, HiddenCss, defaultProps } from 'reactxx-mui-web/HiddenCss/HiddenCss'
            
export const HiddenCssCreator = withStylesCreator<Shape>(styles, HiddenCss, {
  isMui: true,
  defaultProps
});
const HiddenCssComponent = HiddenCssCreator();
if (HiddenCss['muiName']) HiddenCssComponent['muiName'] = HiddenCss['muiName']
export default HiddenCssComponent;
