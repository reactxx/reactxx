
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/TabIndicator/TabIndicator';
import { styles, TabIndicator, defaultProps } from 'reactxx-mui-web/TabIndicator/TabIndicator'
            
export const TabIndicatorCreator = withStylesCreator<Shape>(styles, TabIndicator, {
  isMui: true,
  defaultProps
});
const TabIndicatorComponent = TabIndicatorCreator();
if (TabIndicator['muiName']) TabIndicatorComponent['muiName'] = TabIndicator['muiName']
export default TabIndicatorComponent;
