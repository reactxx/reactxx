import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import RootRef from "../RootRef/RootRef";
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import exactProp from '../utils/exactProp';
import Grow from "../Grow/Grow";
import Popper from '../Popper';
export const styles = theme => ({
  /* Styles applied to the Popper component. */
  popper: {
    zIndex: theme.zIndex.tooltip,
    opacity: 0.9
  },

  /* Styles applied to the tooltip (label wrapper) element. */
  tooltip: {
    backgroundColor: theme.palette.grey[700],
    borderRadius: theme.shape.borderRadius,
    color: theme.palette.common.white,
    fontFamily: theme.typography.fontFamily,
    padding: '4px 8px',
    fontSize: theme.typography.pxToRem(10),
    lineHeight: `${theme.typography.round(14 / 10)}em`
  },

  /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
  touch: {
    padding: '8px 16px',
    fontSize: theme.typography.pxToRem(14),
    lineHeight: `${theme.typography.round(16 / 14)}em`
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
  tooltipPlacementLeft: {
    transformOrigin: 'right center',
    margin: '0 24px ',
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px'
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
  tooltipPlacementRight: {
    transformOrigin: 'left center',
    margin: '0 24px',
    [theme.breakpoints.up('sm')]: {
      margin: '0 14px'
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
  tooltipPlacementTop: {
    transformOrigin: 'center bottom',
    margin: '24px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0'
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
  tooltipPlacementBottom: {
    transformOrigin: 'center top',
    margin: '24px 0',
    [theme.breakpoints.up('sm')]: {
      margin: '14px 0'
    }
  }
});

class Tooltip extends React.Component {
  enterTimer = null;
  leaveTimer = null;
  touchTimer = null;
  closeTimer = null;
  childrenRef = null;
  isControlled = null;
  ignoreNonTouchEvents = false;
  defaultId = null;
  internalState = {
    hover: false,
    focus: false
  };

  constructor(props) {
    super(props);
    this.isControlled = props.open != null;
    this.state = {
      open: null
    };

    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.open = false;
    }
  }

  componentDidMount() {
    warning(!this.childrenRef.disabled || !this.childrenRef.tagName.toLowerCase() === 'button', ['Material-UI: you are providing a disabled `button` child to the Tooltip component.', 'A disabled element does not fire events.', "Tooltip needs to listen to the child element's events to display the title.", '', 'Place a `div` container on top of the element.'].join('\n')); // Fallback to this default id when possible.
    // Use the random value for client side rendering only.
    // We can't use it server side.

    this.defaultId = `mui-tooltip-${Math.round(Math.random() * 1e5)}`; // Rerender with this.defaultId and this.childrenRef.

    if (this.props.open) {
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    clearTimeout(this.touchTimer);
    clearTimeout(this.closeTimer);
  }

  onRootRef = ref => {
    this.childrenRef = ref;
  };
  handleEnter = event => {
    const {
      children,
      enterDelay
    } = this.props;
    const childrenProps = children.props;

    if (event.type === 'focus') {
      this.internalState.focus = true;

      if (childrenProps.onFocus) {
        childrenProps.onFocus(event);
      }
    }

    if (event.type === 'mouseenter') {
      this.internalState.hover = true;

      if (childrenProps.onMouseEnter) {
        childrenProps.onMouseEnter(event);
      }
    }

    if (this.ignoreNonTouchEvents && event.type !== 'touchstart') {
      return;
    } // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).


    this.childrenRef.setAttribute('title', '');
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);

    if (enterDelay) {
      event.persist();
      this.enterTimer = setTimeout(() => {
        this.handleOpen(event);
      }, enterDelay);
    } else {
      this.handleOpen(event);
    }
  };
  handleOpen = event => {
    if (!this.isControlled) {
      this.setState({
        open: true
      });
    }

    if (this.props.onOpen) {
      this.props.onOpen(event);
    }
  };
  handleLeave = event => {
    const {
      children,
      leaveDelay
    } = this.props;
    const childrenProps = children.props;

    if (event.type === 'blur') {
      this.internalState.focus = false;

      if (childrenProps.onBlur) {
        childrenProps.onBlur(event);
      }
    }

    if (event.type === 'mouseleave') {
      this.internalState.hover = false;

      if (childrenProps.onMouseLeave) {
        childrenProps.onMouseLeave(event);
      }
    }

    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);

    if (leaveDelay) {
      event.persist();
      this.leaveTimer = setTimeout(() => {
        this.handleClose(event);
      }, leaveDelay);
    } else {
      this.handleClose(event);
    }
  };
  handleClose = event => {
    if (this.internalState.focus || this.internalState.hover) {
      return;
    }

    if (!this.isControlled) {
      this.setState({
        open: false
      });
    }

    if (this.props.onClose) {
      this.props.onClose(event);
    }

    clearTimeout(this.closeTimer);
    this.closeTimer = setTimeout(() => {
      this.ignoreNonTouchEvents = false;
    }, this.props.theme.transitions.duration.shortest);
  };
  handleTouchStart = event => {
    this.ignoreNonTouchEvents = true;
    const {
      children,
      enterTouchDelay
    } = this.props;

    if (children.props.onTouchStart) {
      children.props.onTouchStart(event);
    }

    clearTimeout(this.leaveTimer);
    clearTimeout(this.closeTimer);
    clearTimeout(this.touchTimer);
    event.persist();
    this.touchTimer = setTimeout(() => {
      this.handleEnter(event);
    }, enterTouchDelay);
  };
  handleTouchEnd = event => {
    const {
      children,
      leaveTouchDelay
    } = this.props;

    if (children.props.onTouchEnd) {
      children.props.onTouchEnd(event);
    }

    clearTimeout(this.touchTimer);
    clearTimeout(this.leaveTimer);
    event.persist();
    this.leaveTimer = setTimeout(() => {
      this.handleClose(event);
    }, leaveTouchDelay);
  };

  render() {
    const {
      $system: {
        classNames,
        classNamesStr,
        theme
      },
      children,
      classes,
      disableFocusListener,
      disableHoverListener,
      disableTouchListener,
      id,
      open: openProp,
      placement,
      PopperProps,
      title,
      TransitionComponent,
      TransitionProps
    } = this.props;
    let open = this.isControlled ? openProp : this.state.open; // There is no point at displaying an empty tooltip.

    if (title === '') {
      open = false;
    }

    const childrenProps = {
      'aria-describedby': open ? id || this.defaultId : null,
      title: !open && typeof title === 'string' ? title : null
    };

    if (!disableTouchListener) {
      childrenProps.onTouchStart = this.handleTouchStart;
      childrenProps.onTouchEnd = this.handleTouchEnd;
    }

    if (!disableHoverListener) {
      childrenProps.onMouseEnter = this.handleEnter;
      childrenProps.onMouseLeave = this.handleLeave;
    }

    if (!disableFocusListener) {
      childrenProps.onFocus = this.handleEnter;
      childrenProps.onBlur = this.handleLeave;
    }

    warning(!children.props.title, ['Material-UI: you have provided a `title` property to the child of <Tooltip />.', `Remove this title property \`${children.props.title}\` or the Tooltip component.`].join('\n'));
    return <React.Fragment>
        <RootRef rootRef={this.onRootRef}>{React.cloneElement(children, childrenProps)}</RootRef>
        <Popper className={classes.popper} placement={placement} anchorEl={this.childrenRef} open={open} id={childrenProps['aria-describedby']} transition {...PopperProps}>
          {({
          placement: placementInner,
          TransitionProps: TransitionPropsInner
        }) => <TransitionComponent timeout={theme.transitions.duration.shorter} {...TransitionPropsInner} {...TransitionProps}>
              <div className={classNamesStr(classes.tooltip, this.ignoreNonTouchEvents && classes.touch, classes[`tooltipPlacement${capitalize(placementInner.split('-')[0])}`])}>
                {title}
              </div>
            </TransitionComponent>}
        </Popper>
      </React.Fragment>;
  }

}

Tooltip.propTypes = exactProp(Tooltip.propTypes);
const defaultProps = Tooltip.defaultProps = {
  disableFocusListener: false,
  disableHoverListener: false,
  disableTouchListener: false,
  enterDelay: 0,
  enterTouchDelay: 1000,
  leaveDelay: 0,
  leaveTouchDelay: 1500,
  placement: 'bottom',
  TransitionComponent: Grow
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Tooltip/Tooltip').Shape>}
*/
export const TooltipCreator = withStyles(styles, Tooltip, {
  isMui: true,
  defaultProps
});
const TooltipComponent = TooltipCreator();
export default TooltipComponent;