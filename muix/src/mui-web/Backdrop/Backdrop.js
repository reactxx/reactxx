import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import Fade from "../Fade/Fade";
export const styles = {
  /* Styles applied to the root element. */
  root: {
    zIndex: -1,
    position: 'fixed',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent'
  },

  /* Styles applied to the root element if `invisible={true}`. */
  invisible: {
    backgroundColor: 'transparent'
  }
};

function Backdrop(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
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

const defaultProps = Backdrop.defaultProps = {
  invisible: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Backdrop/Backdrop').Shape>}
*/
export const BackdropCreator = withStyles(styles, Backdrop, {
  isMui: true,
  defaultProps
});
const BackdropComponent = BackdropCreator();
if (Backdrop.muiName) BackdropComponent.muiName = Backdrop.muiName;
export default BackdropComponent;