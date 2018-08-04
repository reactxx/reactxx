
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Typography/Typography';
import { styles, Typography, defaultProps } from 'reactxx-mui-web/Typography/Typography'
            
export const TypographyCreator = withStylesCreator<Shape>(styles, Typography, {
  isMui: true,
  defaultProps
});
const TypographyComponent = TypographyCreator();
if (Typography['muiName']) TypographyComponent['muiName'] = Typography['muiName']
export default TypographyComponent;
