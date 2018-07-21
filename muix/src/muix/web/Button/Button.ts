import meta from 'material-ui/Button/Button'
import { Types } from 'reactxx-basic'

import { Shape } from '../../common/Button/Button'
import withStyles from '../styles/withStyles'

export default withStyles<Shape>(meta.styles as any as Types.SheetCreatorX<Shape>, { defaultProps: meta.defaultProps as Types.PropsX<Shape> })(meta.component)