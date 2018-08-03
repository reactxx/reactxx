import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { isHorizontal } from '../Drawer/Drawer';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: theme.zIndex.drawer - 1
  },
  anchorLeft: {
    right: 'auto'
  },
  anchorRight: {
    left: 'auto',
    right: 0
  },
  anchorTop: {
    bottom: 'auto',
    right: 0
  },
  anchorBottom: {
    top: 'auto',
    bottom: 0,
    right: 0
  }
});
/**
 * @ignore - internal component.
 */

function SwipeArea(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    anchor,
    classes,
    width,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, classes[`anchor${capitalize(anchor)}`])} style={{
    [isHorizontal(props) ? 'width' : 'height']: width
  }} {...other} />;
}

const defaultProps = SwipeArea.defaultProps = {};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/SwipeableDrawer/SwipeArea').Shape>}
*/
export const SwipeAreaCreator = withStyles(styles, SwipeArea, {
  isMui: true,
  defaultProps
});
const SwipeAreaComponent = SwipeAreaCreator();
if (SwipeArea.muiName) SwipeAreaComponent.muiName = SwipeArea.muiName;
export default SwipeAreaComponent;