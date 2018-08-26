//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import warning from "warning";
import { classNames } from "reactxx-basic";
import RootRef from "../RootRef/RootRef";
import { capitalize } from "../utils/helpers";
import exactProp from "../utils/exactProp";
import Grow from "../Grow/Grow";
import Popper from "../Popper/Popper";
import { StandardProps } from "..";
import { TransitionProps } from "../transitions/transition";
import { PortalProps } from "../Portal/Portal";
export interface TooltipProps
  extends StandardProps<
      React.HTMLAttributes<HTMLDivElement>,
      TooltipClassKey,
      "title"
    > {
  children?: React.ReactElement<any>;
  disableFocusListener?: boolean;
  disableHoverListener?: boolean;
  disableTouchListener?: boolean;
  enterDelay?: number;
  enterTouchDelay?: number;
  id?: string;
  leaveDelay?: number;
  leaveTouchDelay?: number;
  onClose?: (event: React.ChangeEvent<{}>) => void;
  onOpen?: (event: React.ChangeEvent<{}>) => void;
  open?: boolean;
  placement?:
    | "bottom-end"
    | "bottom-start"
    | "bottom"
    | "left-end"
    | "left-start"
    | "left"
    | "right-end"
    | "right-start"
    | "right"
    | "top-end"
    | "top-start"
    | "top";
  PopperProps?: Object;
  title: React.ReactNode;
  TransitionComponent?: React.ReactType;
  TransitionProps?: TransitionProps;
}
export type TooltipClassKey =
  | "popper"
  | "tooltip"
  | "touch"
  | "tooltipPlacementLeft"
  | "tooltipPlacementRight"
  | "tooltipPlacementTop"
  | "tooltipPlacementBottom";

const styles = theme => ({
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
    padding: "4px 8px",
    fontSize: theme.typography.pxToRem(10),
    lineHeight: `${theme.typography.round(14 / 10)}em`,
    maxWidth: 300
  },

  /* Styles applied to the tooltip (label wrapper) element if the tooltip is opened by touch. */
  touch: {
    padding: "8px 16px",
    fontSize: theme.typography.pxToRem(14),
    lineHeight: `${theme.typography.round(16 / 14)}em`
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "left". */
  tooltipPlacementLeft: {
    transformOrigin: "right center",
    margin: "0 24px ",
    [theme.breakpoints.up("sm")]: {
      margin: "0 14px"
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "right". */
  tooltipPlacementRight: {
    transformOrigin: "left center",
    margin: "0 24px",
    [theme.breakpoints.up("sm")]: {
      margin: "0 14px"
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "top". */
  tooltipPlacementTop: {
    transformOrigin: "center bottom",
    margin: "24px 0",
    [theme.breakpoints.up("sm")]: {
      margin: "14px 0"
    }
  },

  /* Styles applied to the tooltip (label wrapper) element if `placement` contains "bottom". */
  tooltipPlacementBottom: {
    transformOrigin: "center top",
    margin: "24px 0",
    [theme.breakpoints.up("sm")]: {
      margin: "14px 0"
    }
  }
});

class Tooltip extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  static options;
  childrenRef = null;
  closeTimer = null;
  defaultId = null;
  enterTimer = null;
  focusTimer = null;
  ignoreNonTouchEvents = false;
  isControlled = null;
  leaveTimer = null;
  touchTimer = null;

  constructor(props) {
    super(props);
    this.isControlled = props.open != null;
    this.state = {
      open: null
    };

    if (!this.isControlled) {
      // not controlled, use internal state
      (this.state.open as any) = false;
    }
  }

  componentDidMount() {
    warning(
      !this.childrenRef.disabled ||
        !this.childrenRef.tagName.toLowerCase() === ("button" as any),
      [
        "Material-UI: you are providing a disabled `button` child to the Tooltip component.",
        "A disabled element does not fire events.",
        "Tooltip needs to listen to the child element's events to display the title.",
        "",
        "Place a `div` container on top of the element."
      ].join("\n")
    ); // Fallback to this default id when possible.
    // Use the random value for client side rendering only.
    // We can't use it server side.

    this.defaultId = `mui-tooltip-${Math.round(Math.random() * 1e5)}`; // Rerender with this.defaultId and this.childrenRef.

    if (this.props.open) {
      this.forceUpdate();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
    clearTimeout(this.enterTimer);
    clearTimeout(this.focusTimer);
    clearTimeout(this.leaveTimer);
    clearTimeout(this.touchTimer);
  }

  onRootRef = ref => {
    this.childrenRef = ref;
  };
  handleFocus = event => {
    event.persist(); // The autoFocus of React might trigger the event before the componentDidMount.
    // We need to account for this eventuality.

    this.focusTimer = setTimeout(() => {
      this.handleEnter(event);
    });
  };
  handleEnter = event => {
    const { children, enterDelay } = this.props;
    const childrenProps = children.props;

    if (event.type === "focus" && childrenProps.onFocus) {
      childrenProps.onFocus(event);
    }

    if (event.type === "mouseover" && childrenProps.onMouseOver) {
      childrenProps.onMouseOver(event);
    }

    if (this.ignoreNonTouchEvents && event.type !== "touchstart") {
      return;
    } // Remove the title ahead of time.
    // We don't want to wait for the next render commit.
    // We would risk displaying two tooltips at the same time (native + this one).

    this.childrenRef.setAttribute("title", "");
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
    // The mouseover event will trigger for every nested element in the tooltip.
    // We can skip rerendering when the tooltip is already open.
    // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
    if (!this.isControlled && !this.state.open) {
      this.setState({
        open: true
      });
    }

    if (this.props.onOpen) {
      this.props.onOpen(event);
    }
  };
  handleLeave = event => {
    const { children, leaveDelay } = this.props;
    const childrenProps = children.props;

    if (event.type === "blur" && childrenProps.onBlur) {
      childrenProps.onBlur(event);
    }

    if (event.type === "mouseleave" && childrenProps.onMouseLeave) {
      childrenProps.onMouseLeave(event);
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
    }, this.props.$system.theme.transitions.duration.shortest);
  };
  handleTouchStart = event => {
    this.ignoreNonTouchEvents = true;
    const { children, enterTouchDelay } = this.props;

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
    const { children, leaveTouchDelay } = this.props;

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
      $system: { theme },
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

    if (title === "") {
      open = false;
    }

    const childrenProps: any = {
      "aria-describedby": open ? id || this.defaultId : null,
      title: !open && typeof title === "string" ? title : null
    };

    if (!disableTouchListener) {
      childrenProps.onTouchStart = this.handleTouchStart;
      childrenProps.onTouchEnd = this.handleTouchEnd;
    }

    if (!disableHoverListener) {
      childrenProps.onMouseOver = this.handleEnter;
      childrenProps.onMouseLeave = this.handleLeave;
    }

    if (!disableFocusListener) {
      childrenProps.onFocus = this.handleFocus;
      childrenProps.onBlur = this.handleLeave;
    }

    warning(
      !children.props.title,
      [
        "Material-UI: you have provided a `title` property to the child of <Tooltip />.",
        `Remove this title property \`${
          children.props.title
        }\` or the Tooltip component.`
      ].join("\n")
    );
    return (
      <React.Fragment>
        <RootRef
          {...{
            rootRef: this.onRootRef
          }}
        >
          {React.cloneElement(children, childrenProps)}
        </RootRef>
        <Popper
          className={classes.popper as any}
          placement={placement}
          anchorEl={this.childrenRef}
          open={open}
          id={childrenProps["aria-describedby"]}
          transition
          {...PopperProps as any}
        >
          {({
            placement: placementInner,
            TransitionProps: TransitionPropsInner
          }) => (
            <TransitionComponent
              timeout={theme.transitions.duration.shorter}
              {...TransitionPropsInner as any}
              {...TransitionProps as any}
            >
              <div
                className={classNames(
                  classes.tooltip,
                  this.ignoreNonTouchEvents && classes.touch,
                  classes[
                    `tooltipPlacement${capitalize(
                      placementInner.split("-")[0]
                    )}`
                  ]
                )}
              >
                {title}
              </div>
            </TransitionComponent>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<TooltipClassKey>,
  props: TooltipProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = Tooltip.defaultProps = {
  disableFocusListener: false,
  disableHoverListener: false,
  disableTouchListener: false,
  enterDelay: 0,
  enterTouchDelay: 1000,
  leaveDelay: 0,
  leaveTouchDelay: 1500,
  placement: 'bottom',
  TransitionComponent: Grow
} as CodeProps;
export const TooltipCode: CodeComponentType = Tooltip as any
export const TooltipStyles: SheetCreatorX = styles as any
export const TooltipCreator: WithStyleCreator = withStyles<Shape>(TooltipStyles, TooltipCode, {isMui:true, defaultProps});
export const TooltipComponent: React.ComponentClass<PropsX> = TooltipCreator();
if ((Tooltip as any).muiName) (TooltipComponent as any).muiName = (Tooltip as any).muiName;


export default TooltipComponent
