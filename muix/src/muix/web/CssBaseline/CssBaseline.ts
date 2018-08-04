
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/CssBaseline/CssBaseline';
import { styles, CssBaseline, defaultProps } from 'reactxx-mui-web/CssBaseline/CssBaseline'
            
export const CssBaselineCreator = withStylesCreator<Shape>(styles, CssBaseline, {
  isMui: true,
  defaultProps
});
const CssBaselineComponent = CssBaselineCreator();
if (CssBaseline['muiName']) CssBaselineComponent['muiName'] = CssBaseline['muiName']
export default CssBaselineComponent;
