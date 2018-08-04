
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/CardContent/CardContent';
import { styles, CardContent, defaultProps } from 'reactxx-mui-web/CardContent/CardContent'
            
export const CardContentCreator = withStylesCreator<Shape>(styles, CardContent, {
  isMui: true,
  defaultProps
});
const CardContentComponent = CardContentCreator();
if (CardContent['muiName']) CardContentComponent['muiName'] = CardContent['muiName']
export default CardContentComponent;
