import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import withStyles from '../styles/withStyles';
import Slide from '../Slide';
import Paper from '../Paper';
import { capitalize } from '../utils/helpers';
import { duration } from '../styles/transitions';
const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up'
};
export function isHorizontal(props) {
  return ['left', 'right'].indexOf(props.anchor) !== -1;
}
export function getAnchor(props) {
  return props.theme.direction === 'rtl' && isHorizontal(props) ? oppositeDirection[props.anchor] : props.anchor;
}
export const styles = theme => ({
  docked: {
    flex: '0 0 auto'
  },
  paper: {
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    flex: '1 0 auto',
    zIndex: theme.zIndex.drawer,
    WebkitOverflowScrolling: 'touch',
    // Add iOS momentum scrolling.
    // temporary style
    position: 'fixed',
    top: 0,
    // We disable the focus ring for mouse, touch and keyboard users.
    // At some point, it would be better to keep it for keyboard users.
    // :focus-ring CSS pseudo-class will help.
    outline: 'none'
  },
  paperAnchorLeft: {
    left: 0,
    right: 'auto'
  },
  paperAnchorRight: {
    left: 'auto',
    right: 0
  },
  paperAnchorTop: {
    top: 0,
    left: 0,
    bottom: 'auto',
    right: 0,
    height: 'auto',
    maxHeight: '100vh'
  },
  paperAnchorBottom: {
    top: 'auto',
    left: 0,
    bottom: 0,
    right: 0,
    height: 'auto',
    maxHeight: '100vh'
  },
  paperAnchorDockedLeft: {
    borderRight: `1px solid ${theme.palette.divider}`
  },
  paperAnchorDockedTop: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },
  paperAnchorDockedRight: {
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  paperAnchorDockedBottom: {
    borderTop: `1px solid ${theme.palette.divider}`
  },
  modal: {} // Just here so people can override the style.

});
/**
 * The properties of the [Modal](/api/modal) component are available
 * when `variant="temporary"` is set.
 */

class Drawer extends React.Component {
  // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.
  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
      anchor: anchorProp,
      children,
      classes,
      className,
      elevation,
      ModalProps: {
        BackdropProps: BackdropPropsProp,
        ...ModalProps
      } = {},
      onClose,
      open,
      PaperProps,
      SlideProps,
      theme,
      transitionDuration,
      variant,
      ...other
    } = this.props;
    const anchor = getAnchor(this.props);
    const drawer = <Paper elevation={variant === 'temporary' ? elevation : 0} square className={classNames(classes.paper, classes[`paperAnchor${capitalize(anchor)}`], variant !== 'temporary' && classes[`paperAnchorDocked${capitalize(anchor)}`])} {...PaperProps}>
        {children}
      </Paper>;

    if (variant === 'permanent') {
      return <div className={classNamesStr(classes.docked, className)} {...other}>
          {drawer}
        </div>;
    }

    const slidingDrawer = <Slide in={open} direction={oppositeDirection[anchor]} timeout={transitionDuration} appear={this.mounted} {...SlideProps}>
        {drawer}
      </Slide>;

    if (variant === 'persistent') {
      return <div className={classNamesStr(classes.docked, className)} {...other}>
          {slidingDrawer}
        </div>;
    } // variant === temporary


    return <Modal BackdropProps={{ ...BackdropPropsProp,
      transitionDuration
    }} className={classNames(classes.modal, className)} open={open} onClose={onClose} {...other} {...ModalProps}>
        {slidingDrawer}
      </Modal>;
  }

}

export default withStyles(styles, {
  name: 'MuiDrawer',
  flip: false,
  withTheme: true,
  defaultProps: {
    anchor: 'left',
    elevation: 16,
    open: false,
    transitionDuration: {
      enter: duration.enteringScreen,
      exit: duration.leavingScreen
    },
    variant: 'temporary' // Mobile first.

  }
})(Drawer);