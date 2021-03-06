//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v3.0.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
// @inheritedComponent Transition
import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import EventListener from "react-event-listener";
import debounce from "debounce"; // < 1kb payload overhead when lodash/debounce is > 3kb.

import Transition from "react-transition-group/Transition";
import ownerWindow from "../utils/ownerWindow";
import { duration } from "../styles/transitions";
import { reflow, getTransitionProps } from "../transitions/utils";
import { TransitionProps } from "../transitions/transition";
export interface SlideProps extends TransitionProps {
  direction: "left" | "right" | "up" | "down";
  theme?: Theme;
}
const GUTTER = 24; // Translate the node so he can't be seen on the screen.
// Later, we gonna translate back the node to his original location
// with `translate3d(0, 0, 0)`.`

function getTranslateValue(props, node) {
  const { direction } = props;
  const rect = node.getBoundingClientRect();
  let transform;

  if (node.fakeTransform) {
    transform = node.fakeTransform;
  } else {
    const computedStyle = ownerWindow(node).getComputedStyle(node);
    transform =
      computedStyle.getPropertyValue("-webkit-transform") ||
      computedStyle.getPropertyValue("transform");
  }

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== "none" && typeof transform === "string") {
    const transformValues = transform
      .split("(")[1]
      .split(")")[0]
      .split(",");
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === "left") {
    return `translateX(100vw) translateX(-${rect.left - offsetX}px)`;
  }

  if (direction === "right") {
    return `translateX(-${rect.left + rect.width + GUTTER - offsetX}px)`;
  }

  if (direction === "up") {
    return `translateY(100vh) translateY(-${rect.top - offsetY}px)`;
  } // direction === 'down'

  return `translateY(-${rect.top + rect.height + GUTTER - offsetY}px)`;
}

export function setTranslateValue(props, node) {
  const transform = getTranslateValue(props, node);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}
/**
 * The Slide transition is used by the [Snackbar](/demos/snackbars) component.
 * It uses [react-transition-group](https://github.com/reactjs/react-transition-group) internally.
 */

class Slide extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  transitionRef;
  static options;
  mounted = false;
  transition = null;
  handleResize = debounce(() => {
    // Skip configuration where the position is screen size invariant.
    if (
      this.props.in ||
      this.props.direction === "down" ||
      this.props.direction === "right"
    ) {
      return;
    }

    if (this.transitionRef) {
      setTranslateValue(this.props, this.transitionRef);
    }
  }, 166); // Corresponds to 10 frames at 60 Hz.

  componentDidMount() {
    // state.mounted handle SSR, once the component is mounted, we need
    // to properly hide it.
    if (!this.props.in) {
      // We need to set initial translate values of transition element
      // otherwise component will be shown when in=false.
      this.updatePosition();
    }

    this.mounted = true;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.direction !== this.props.direction && !this.props.in) {
      // We need to update the position of the drawer when the direction change and
      // when it's hidden.
      this.updatePosition();
    }
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  handleEnter = node => {
    setTranslateValue(this.props, node);
    reflow(node);

    if (this.props.onEnter) {
      this.props.onEnter(node, false);
    }
  };
  handleEntering = node => {
    const { theme } = this.props;
    const transitionProps = getTransitionProps(this.props, {
      mode: "enter"
    });
    node.style.webkitTransition = theme.transitions.create(
      "-webkit-transform",
      {
        ...transitionProps,
        easing: theme.transitions.easing.easeOut
      }
    );
    node.style.transition = theme.transitions.create("transform", {
      ...transitionProps,
      easing: theme.transitions.easing.easeOut
    });
    node.style.webkitTransform = "translate(0, 0)";
    node.style.transform = "translate(0, 0)";

    if (this.props.onEntering) {
      this.props.onEntering(node, false);
    }
  };
  handleExit = node => {
    const { theme } = this.props;
    const transitionProps = getTransitionProps(this.props, {
      mode: "exit"
    });
    node.style.webkitTransition = theme.transitions.create(
      "-webkit-transform",
      {
        ...transitionProps,
        easing: theme.transitions.easing.sharp
      }
    );
    node.style.transition = theme.transitions.create("transform", {
      ...transitionProps,
      easing: theme.transitions.easing.sharp
    });
    setTranslateValue(this.props, node);

    if (this.props.onExit) {
      this.props.onExit(node);
    }
  };
  handleExited = node => {
    // No need for transitions when the component is hidden
    node.style.webkitTransition = "";
    node.style.transition = "";

    if (this.props.onExited) {
      this.props.onExited(node);
    }
  };

  updatePosition() {
    if (this.transitionRef) {
      this.transitionRef.style.visibility = "inherit";
      setTranslateValue(this.props, this.transitionRef);
    }
  }

  render() {
    const {
      $system: { theme },
      children,
      onEnter,
      onEntering,
      onExit,
      onExited,
      style: styleProp,
      ...other
    } = this.props;
    let style: any = {}; // We use this state to handle the server-side rendering.
    // We don't know the width of the children ahead of time.
    // We need to render it.

    if (!this.props.in && !this.mounted) {
      style.visibility = "hidden";
    }

    style = {
      ...style,
      ...styleProp,
      ...(React.isValidElement(children) ? (children as any).props.style : {})
    };
    return (
      <EventListener target="window" onResize={this.handleResize}>
        <Transition
          onEnter={this.handleEnter}
          onEntering={this.handleEntering}
          onExit={this.handleExit}
          onExited={this.handleExited}
          appear
          style={style}
          ref={ref => {
            this.transitionRef = ReactDOM.findDOMNode(ref);
          }}
          {...other as any}
        >
          {children}
        </Transition>
      </EventListener>
    );
  }
}

const styles = {};

export interface Shape extends Types.ShapeDefault {
  
  props: SlideProps
  style: 'Text'
  theme: Theme
}
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = Slide.defaultProps = {
  direction: 'down',
  timeout: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  }
} as CodeProps;
export const SlideCode: CodeComponentType = Slide as any
export const SlideStyles: SheetCreatorX = styles as any
export const SlideCreator: WithStyleCreator = withStyles<Shape>(SlideStyles, SlideCode, {isMui:true, defaultProps});
export const SlideComponent: React.ComponentClass<PropsX> = SlideCreator();
if ((Slide as any).muiName) (SlideComponent as any).muiName = (Slide as any).muiName;


export default SlideComponent
