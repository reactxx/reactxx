//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v3.0.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import PopperJS from "popper.js";
import Portal from "../Portal/Portal";
import { ReferenceObject } from "popper.js";
import { PortalProps } from "../Portal/Portal";
import { TransitionProps } from "../transitions/transition";
export type PopperPlacementType =
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
export interface PopperProps extends React.HTMLAttributes<HTMLDivElement> {
  transition?: boolean;
  anchorEl?:
    | null
    | HTMLElement
    | ReferenceObject
    | ((element: HTMLElement) => HTMLElement);
  children:
    | React.ReactNode
    | ((
        props: {
          placement: PopperPlacementType;
          TransitionProps?: TransitionProps;
        }
      ) => React.ReactNode);
  container?: PortalProps["container"];
  disablePortal?: PortalProps["disablePortal"];
  keepMounted?: boolean;
  modifiers?: object;
  open: boolean;
  placement?: PopperPlacementType;
  popperOptions?: object;
}

function flipPlacement(theme, placement) {
  if (theme.direction !== "rtl") {
    return placement;
  }

  switch (placement) {
    case "bottom-end":
      return "bottom-start";

    case "bottom-start":
      return "bottom-end";

    case "top-end":
      return "top-start";

    case "top-start":
      return "top-end";

    default:
      return placement;
  }
}

function getAnchorEl(anchorEl) {
  return typeof anchorEl === "function" ? anchorEl() : anchorEl;
}
/**
 * Poppers rely on the 3rd party library [Popper.js](https://github.com/FezVrasta/popper.js) for positioning.
 */

class Popper extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  static options;
  popper = null;

  constructor(props) {
    super(props);
    this.state = {
      exited: !props.open
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.open !== this.props.open &&
      !this.props.open &&
      !this.props.transition
    ) {
      // Otherwise handleExited will call this.
      this.handleClose();
    } // Let's update the popper position.

    if (
      prevProps.open !== this.props.open ||
      prevProps.anchorEl !== this.props.anchorEl ||
      prevProps.popperOptions !== this.props.popperOptions ||
      prevProps.modifiers !== this.props.modifiers ||
      prevProps.disablePortal !== this.props.disablePortal ||
      prevProps.placement !== this.props.placement
    ) {
      this.handleOpen();
    }
  }

  componentWillUnmount() {
    this.handleClose();
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.open) {
      return {
        exited: false
      };
    }

    if (!nextProps.transition) {
      // Otherwise let handleExited take care of marking exited.
      return {
        exited: true
      };
    }

    return null;
  }

  handleOpen = () => {
    const {
      $system: { theme },
      anchorEl,
      modifiers,
      open,
      placement,
      popperOptions = {} as any,
      disablePortal
    } = this.props;
    const popperNode: any = ReactDOM.findDOMNode(this);

    if (!popperNode || !anchorEl || !open) {
      return;
    }

    if (this.popper) {
      this.popper.destroy();
      this.popper = null;
    }

    this.popper = new PopperJS(getAnchorEl(anchorEl), popperNode, {
      placement: flipPlacement(theme, placement),
      ...popperOptions,
      modifiers: {
        ...(disablePortal
          ? {}
          : {
              // It's using scrollParent by default, we can use the viewport when using a portal.
              preventOverflow: {
                boundariesElement: "window"
              }
            }),
        ...modifiers,
        ...popperOptions.modifiers
      },
      // We could have been using a custom modifier like react-popper is doing.
      // But it seems this is the best public API for this use case.
      onCreate: this.handlePopperUpdate,
      onUpdate: this.handlePopperUpdate
    });
  };
  handlePopperUpdate = data => {
    if (data.placement !== this.state.placement) {
      this.setState({
        placement: data.placement
      });
    }
  };
  handleExited = () => {
    this.setState({
      exited: true
    });
    this.handleClose();
  };
  handleClose = () => {
    if (!this.popper) {
      return;
    }

    this.popper.destroy();
    this.popper = null;
  };

  render() {
    const {
      $system: { theme },
      anchorEl,
      children,
      container,
      disablePortal,
      keepMounted,
      modifiers,
      open,
      placement: placementProps,
      popperOptions,
      transition,
      ...other
    } = this.props;
    const { exited, placement } = this.state;

    if (!keepMounted && !open && (!transition || exited)) {
      return null;
    }

    const childProps: any = {
      placement: placement || flipPlacement(theme, placementProps)
    };

    if (transition) {
      childProps.TransitionProps = {
        in: open,
        onExited: this.handleExited
      };
    }

    return (
      <Portal
        onRendered={this.handleOpen}
        disablePortal={disablePortal}
        container={container}
      >
        <div
          role="tooltip"
          style={{
            // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
            position: "absolute"
          }}
          {...other as any}
        >
          {typeof children === "function" ? children(childProps) : children}
        </div>
      </Portal>
    );
  }
}

const styles = {};

export interface Shape extends Types.ShapeDefault {
  
  props: PopperProps
  style: 'Text'
  theme: Theme
}
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = Popper.defaultProps = {
  disablePortal: false,
  placement: 'bottom',
  transition: false
} as CodeProps;
export const PopperCode: CodeComponentType = Popper as any
export const PopperStyles: SheetCreatorX = styles as any
export const PopperCreator: WithStyleCreator = withStyles<Shape>(PopperStyles, PopperCode, {isMui:true, defaultProps});
export const PopperComponent: React.ComponentClass<PropsX> = PopperCreator();
if ((Popper as any).muiName) (PopperComponent as any).muiName = (Popper as any).muiName;


export default PopperComponent
