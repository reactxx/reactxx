
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/CardHeader/CardHeader';
import { styles, CardHeader, defaultProps } from 'reactxx-mui-web/CardHeader/CardHeader'
            
export const CardHeaderCreator = withStylesCreator<Shape>(styles, CardHeader, {
  isMui: true,
  defaultProps
});
const CardHeaderComponent = CardHeaderCreator();
if (CardHeader['muiName']) CardHeaderComponent['muiName'] = CardHeader['muiName']
export default CardHeaderComponent;
