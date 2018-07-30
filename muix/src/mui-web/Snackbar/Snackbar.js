import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import withStyles from '../styles/withStyles';
import { duration } from '../styles/transitions';
import ClickAwayListener from '../ClickAwayListener';
import { capitalize, createChainedFunction } from '../utils/helpers';
import Slide from '../Slide';
import SnackbarContent from '../SnackbarContent';
export const styles = theme => {
  const gutter = 24;
  const top = {
    top: 0
  };
  const bottom = {
    bottom: 0
  };
  const right = {
    justifyContent: 'flex-end'
  };
  const left = {
    justifyContent: 'flex-start'
  };
  const topSpace = {
    top: gutter
  };
  const bottomSpace = {
    bottom: gutter
  };
  const rightSpace = {
    right: gutter
  };
  const leftSpace = {
    left: gutter
  };
  const center = {
    left: '50%',
    right: 'auto',
    transform: 'translateX(-50%)'
  };
  return {
    root: {
      zIndex: theme.zIndex.snackbar,
      position: 'fixed',
      display: 'flex',
      left: 0,
      right: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    anchorOriginTopCenter: { ...top,
      [theme.breakpoints.up('md')]: { ...center
      }
    },
    anchorOriginBottomCenter: { ...bottom,
      [theme.breakpoints.up('md')]: { ...center
      }
    },
    anchorOriginTopRight: { ...top,
      ...right,
      [theme.breakpoints.up('md')]: {
        left: 'auto',
        ...topSpace,
        ...rightSpace
      }
    },
    anchorOriginBottomRight: { ...bottom,
      ...right,
      [theme.breakpoints.up('md')]: {
        left: 'auto',
        ...bottomSpace,
        ...rightSpace
      }
    },
    anchorOriginTopLeft: { ...top,
      ...left,
      [theme.breakpoints.up('md')]: {
        right: 'auto',
        ...topSpace,
        ...leftSpace
      }
    },
    anchorOriginBottomLeft: { ...bottom,
      ...left,
      [theme.breakpoints.up('md')]: {
        right: 'auto',
        ...bottomSpace,
        ...leftSpace
      }
    }
  };
};
/* istanbul ignore if */

if (process.env.NODE_ENV !== 'production' && !React.createContext) {
  throw new Error('Material-UI: react@16.3.0 or greater is required.');
}

class Snackbar extends React.Component {
  timerAutoHide = null;
  state = {};

  componentDidMount() {
    if (this.props.open) {
      this.setAutoHideTimer();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.open !== this.props.open) {
      if (this.props.open) {
        this.setAutoHideTimer();
      } else {
        clearTimeout(this.timerAutoHide);
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timerAutoHide);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (typeof prevState.exited === 'undefined') {
      return {
        exited: !nextProps.open
      };
    }

    if (nextProps.open) {
      return {
        exited: false
      };
    }

    return null;
  } // Timer that controls delay before snackbar auto hides


  setAutoHideTimer(autoHideDuration) {
    const autoHideDurationBefore = autoHideDuration != null ? autoHideDuration : this.props.autoHideDuration;

    if (!this.props.onClose || autoHideDurationBefore == null) {
      return;
    }

    clearTimeout(this.timerAutoHide);
    this.timerAutoHide = setTimeout(() => {
      const autoHideDurationAfter = autoHideDuration != null ? autoHideDuration : this.props.autoHideDuration;

      if (!this.props.onClose || autoHideDurationAfter == null) {
        return;
      }

      this.props.onClose(null, 'timeout');
    }, autoHideDurationBefore);
  }

  handleMouseEnter = event => {
    if (this.props.onMouseEnter) {
      this.props.onMouseEnter(event);
    }

    this.handlePause();
  };
  handleMouseLeave = event => {
    if (this.props.onMouseLeave) {
      this.props.onMouseLeave(event);
    }

    this.handleResume();
  };
  handleClickAway = event => {
    if (this.props.onClose) {
      this.props.onClose(event, 'clickaway');
    }
  }; // Pause the timer when the user is interacting with the Snackbar
  // or when the user hide the window.

  handlePause = () => {
    clearTimeout(this.timerAutoHide);
  }; // Restart the timer when the user is no longer interacting with the Snackbar
  // or when the window is shown back.

  handleResume = () => {
    if (this.props.autoHideDuration != null) {
      if (this.props.resumeHideDuration != null) {
        this.setAutoHideTimer(this.props.resumeHideDuration);
        return;
      }

      this.setAutoHideTimer(this.props.autoHideDuration * 0.5);
    }
  };
  handleExited = () => {
    this.setState({
      exited: true
    });
  };

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
      action,
      anchorOrigin: {
        vertical,
        horizontal
      },
      autoHideDuration,
      children,
      classes,
      className,
      ContentProps,
      disableWindowBlurListener,
      message,
      onClose,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      onMouseEnter,
      onMouseLeave,
      open,
      resumeHideDuration,
      TransitionComponent,
      transitionDuration,
      TransitionProps,
      ...other
    } = this.props; // So we only render active snackbars.

    if (!open && this.state.exited) {
      return null;
    }

    return <ClickAwayListener onClickAway={this.handleClickAway}>
        <div className={classNamesStr(classes.root, classes[`anchorOrigin${capitalize(vertical)}${capitalize(horizontal)}`], className)} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} {...other}>
          <EventListener target="window" onFocus={disableWindowBlurListener ? undefined : this.handleResume} onBlur={disableWindowBlurListener ? undefined : this.handlePause} />
          <TransitionComponent appear in={open} onEnter={onEnter} onEntered={onEntered} onEntering={onEntering} onExit={onExit} onExited={createChainedFunction(this.handleExited, onExited)} onExiting={onExiting} timeout={transitionDuration} direction={vertical === 'top' ? 'down' : 'up'} {...TransitionProps}>
            {children || <SnackbarContent message={message} action={action} {...ContentProps} />}
          </TransitionComponent>
        </div>
      </ClickAwayListener>;
  }

}

const defaultProps = {
  anchorOrigin: {
    vertical: 'bottom',
    horizontal: 'center'
  },
  disableWindowBlurListener: false,
  TransitionComponent: Slide,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Snackbar/Snackbar').Shape>}
*/
export const SnackbarCreator = withStyles(styles, Snackbar, {
  isMui: true,
  defaultProps
});
const SnackbarComponent = SnackbarCreator();
export default SnackbarComponent;