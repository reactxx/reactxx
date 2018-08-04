
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Card/Card';
import { styles, Card, defaultProps } from 'reactxx-mui-web/Card/Card'
            
export const CardCreator = withStylesCreator<Shape>(styles, Card, {
  isMui: true,
  defaultProps
});
const CardComponent = CardCreator();
if (Card['muiName']) CardComponent['muiName'] = Card['muiName']
export default CardComponent;
