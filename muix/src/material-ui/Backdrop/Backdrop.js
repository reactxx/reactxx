import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Fade from '../Fade';
export const styles = {
  root: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  invisible: {
    backgroundColor: 'transparent'
  }
};

function Backdrop(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    className,
    invisible,
    open,
    transitionDuration,
    ...other
  } = props;
  return <Fade appear in={open} timeout={transitionDuration} {...other}>
      <div data-mui-test="Backdrop" className={classNamesStr(classes.root, invisible && classes.invisible, className)} aria-hidden="true" />
    </Fade>;
}

export default withStyles(styles, {
  name: 'MuiBackdrop',
  defaultProps: {
    invisible: false
  }
})(Backdrop);