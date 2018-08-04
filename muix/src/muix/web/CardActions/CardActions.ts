
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/CardActions/CardActions';
import { styles, CardActions, defaultProps } from 'reactxx-mui-web/CardActions/CardActions'
            
export const CardActionsCreator = withStylesCreator<Shape>(styles, CardActions, {
  isMui: true,
  defaultProps
});
const CardActionsComponent = CardActionsCreator();
if (CardActions['muiName']) CardActionsComponent['muiName'] = CardActions['muiName']
export default CardActionsComponent;
