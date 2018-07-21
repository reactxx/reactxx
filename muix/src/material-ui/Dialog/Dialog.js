// @inheritedComponent Modal
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import Modal from '../Modal';
import Fade from '../Fade';
import { duration } from '../styles/transitions';
import Paper from '../Paper';
export const styles = theme => ({
  root: {},
  scrollPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollBody: {
    overflowY: 'auto',
    overflowX: 'hidden'
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    margin: 48,
    position: 'relative',
    overflowY: 'auto',
    // Fix IE11 issue, to remove at some point.
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 'none'
  },
  paperScrollPaper: {
    flex: '0 1 auto',
    maxHeight: 'calc(100% - 96px)'
  },
  paperScrollBody: {
    margin: '48px auto'
  },
  paperWidthXs: {
    maxWidth: Math.max(theme.breakpoints.values.xs, 360),
    '&$paperScrollBody': {
      [theme.breakpoints.down(Math.max(theme.breakpoints.values.xs, 360) + 48 * 2)]: {
        margin: 48
      }
    }
  },
  paperWidthSm: {
    maxWidth: theme.breakpoints.values.sm,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.sm + 48 * 2)]: {
        margin: 48
      }
    }
  },
  paperWidthMd: {
    maxWidth: theme.breakpoints.values.md,
    '&$paperScrollBody': {
      [theme.breakpoints.down(theme.breakpoints.values.md + 48 * 2)]: {
        margin: 48
      }
    }
  },
  paperFullWidth: {
    width: '100%'
  },
  paperFullScreen: {
    margin: 0,
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    maxHeight: 'none',
    borderRadius: 0
  }
});
/**
 * Dialogs are overlaid modal paper based components with a backdrop.
 */

function Dialog(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    BackdropProps,
    children,
    classes,
    className,
    disableBackdropClick,
    disableEscapeKeyDown,
    fullScreen,
    fullWidth,
    maxWidth,
    onBackdropClick,
    onClose,
    onEnter,
    onEntered,
    onEntering,
    onEscapeKeyDown,
    onExit,
    onExited,
    onExiting,
    open,
    PaperProps,
    scroll,
    TransitionComponent,
    transitionDuration,
    TransitionProps,
    ...other
  } = props;
  return <Modal className={classNames(classes.root, classes[`scroll${capitalize(scroll)}`], className)} BackdropProps={{
    transitionDuration,
    ...BackdropProps
  }} disableBackdropClick={disableBackdropClick} disableEscapeKeyDown={disableEscapeKeyDown} onBackdropClick={onBackdropClick} onEscapeKeyDown={onEscapeKeyDown} onClose={onClose} open={open} role="dialog" {...other}>
      <TransitionComponent appear in={open} timeout={transitionDuration} onEnter={onEnter} onEntering={onEntering} onEntered={onEntered} onExit={onExit} onExiting={onExiting} onExited={onExited} {...TransitionProps}>
        <Paper elevation={24} className={classNames(classes.paper, classes[`paperScroll${capitalize(scroll)}`], maxWidth && classes[`paperWidth${maxWidth ? capitalize(maxWidth) : ''}`], fullScreen && classes.paperFullScreen, fullWidth && classes.paperFullWidth)} {...PaperProps}>
          {children}
        </Paper>
      </TransitionComponent>
    </Modal>;
}

const defaultProps = {
  disableBackdropClick: false,
  disableEscapeKeyDown: false,
  fullScreen: false,
  fullWidth: false,
  maxWidth: 'sm',
  scroll: 'paper',
  TransitionComponent: Fade,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
};
const meta = {
  component: Dialog || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;