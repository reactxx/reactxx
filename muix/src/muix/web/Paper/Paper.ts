
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Paper/Paper';
import { styles, Paper, defaultProps } from 'reactxx-mui-web/Paper/Paper'
            
export const PaperCreator = withStylesCreator<Shape>(styles, Paper, {
  isMui: true,
  defaultProps
});
const PaperComponent = PaperCreator();
if (Paper['muiName']) PaperComponent['muiName'] = Paper['muiName']
export default PaperComponent;
