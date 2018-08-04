
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Textarea/Textarea';
import { styles, Textarea, defaultProps } from 'reactxx-mui-web/Textarea/Textarea'
            
export const TextareaCreator = withStylesCreator<Shape>(styles, Textarea, {
  isMui: true,
  defaultProps
});
const TextareaComponent = TextareaCreator();
if (Textarea['muiName']) TextareaComponent['muiName'] = Textarea['muiName']
export default TextareaComponent;
