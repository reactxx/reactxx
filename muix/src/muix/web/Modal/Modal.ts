
import withStylesCreator from "reactxx-mui-web/styles/withStyles";
import {Shape} from 'reactxx-mui-web/typings/shapes/Modal/Modal';
import { styles, Modal, defaultProps } from 'reactxx-mui-web/Modal/Modal'
            
export const ModalCreator = withStylesCreator<Shape>(styles, Modal, {
  isMui: true,
  defaultProps
});
const ModalComponent = ModalCreator();
if (Modal['muiName']) ModalComponent['muiName'] = Modal['muiName']
export default ModalComponent;
