
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Chip/Chip';
import { styles, Chip, defaultProps } from 'reactxx-mui-web/Chip/Chip'
            
export const ChipCreator = withStylesCreator<Shape>(styles, Chip, {
  isMui: true,
  defaultProps
});
const ChipComponent = ChipCreator();
if (Chip['muiName']) ChipComponent['muiName'] = Chip['muiName']
export default ChipComponent;
