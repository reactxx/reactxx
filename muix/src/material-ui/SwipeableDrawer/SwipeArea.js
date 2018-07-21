import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import { isHorizontal } from '../Drawer/Drawer';
export const styles = theme => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    zIndex: theme.zIndex.drawer - 1
  },
  discoveryAnchorLeft: {
    right: 'auto'
  },
  discoveryAnchorRight: {
    left: 'auto',
    right: 0
  },
  discoveryAnchorTop: {
    bottom: 'auto',
    right: 0
  },
  discoveryAnchorBottom: {
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
      classNamesStr
    },
    anchor,
    classes,
    swipeAreaWidth,
    ...other
  } = props;
  return <div className={classNamesStr(classes.root, classes[`discoveryAnchor${capitalize(anchor)}`])} style={{
    [isHorizontal(props) ? 'width' : 'height']: swipeAreaWidth
  }} {...other} />;
}

const meta = {
  component: SwipeArea || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;