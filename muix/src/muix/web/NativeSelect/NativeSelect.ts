
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/NativeSelect/NativeSelect';
import { styles, NativeSelect, defaultProps } from 'reactxx-mui-web/NativeSelect/NativeSelect'
            
export const NativeSelectCreator = withStylesCreator<Shape>(styles, NativeSelect, {
  isMui: true,
  defaultProps
});
const NativeSelectComponent = NativeSelectCreator();
if (NativeSelect['muiName']) NativeSelectComponent['muiName'] = NativeSelect['muiName']
export default NativeSelectComponent;
