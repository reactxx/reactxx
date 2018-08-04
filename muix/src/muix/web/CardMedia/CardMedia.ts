
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/CardMedia/CardMedia';
import { styles, CardMedia, defaultProps } from 'reactxx-mui-web/CardMedia/CardMedia'
            
export const CardMediaCreator = withStylesCreator<Shape>(styles, CardMedia, {
  isMui: true,
  defaultProps
});
const CardMediaComponent = CardMediaCreator();
if (CardMedia['muiName']) CardMediaComponent['muiName'] = CardMedia['muiName']
export default CardMediaComponent;
