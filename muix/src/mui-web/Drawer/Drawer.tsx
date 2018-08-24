//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v1.5.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme } from '../styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import Modal from "../Modal/Modal";
import Slide from "../Slide/Slide";
import Paper from "../Paper/Paper";
import { capitalize } from "../utils/helpers";
import { duration } from "../styles/transitions";
import { StandardProps } from "..";
import { ModalProps } from "../Modal/Modal";
import { SlideProps } from "../Slide/Slide";
import { PaperProps } from "../Paper/Paper";
import {
  TransitionHandlerProps,
  TransitionProps
} from "../transitions/transition";
export interface DrawerProps
  extends StandardProps<
      ModalProps & Partial<TransitionHandlerProps>,
      DrawerClassKey,
      "open" | "children"
    > {
  anchor?: "left" | "top" | "right" | "bottom";
  children?: React.ReactNode;
  elevation?: number;
  ModalProps?: Partial<ModalProps>;
  open?: boolean;
  PaperProps?: Partial<PaperProps>;
  SlideProps?: Partial<SlideProps>;
  theme?: Theme;
  transitionDuration?: TransitionProps["timeout"];
  variant?: "permanent" | "persistent" | "temporary";
}
export type DrawerClassKey =
  | "docked"
  | "paper"
  | "paperAnchorLeft"
  | "paperAnchorRight"
  | "paperAnchorTop"
  | "paperAnchorBottom"
  | "paperAnchorDockedLeft"
  | "paperAnchorDockedTop"
  | "paperAnchorDockedRight"
  | "paperAnchorDockedBottom"
  | "modal";
const oppositeDirection = {
  left: "right",
  right: "left",
  top: "down",
  bottom: "up"
};
export function isHorizontal(props) {
  return ["left", "right"].indexOf(props.anchor) !== -1;
}
export function getAnchor(props) {
  return props.theme.direction === "rtl" && isHorizontal(props)
    ? oppositeDirection[props.anchor]
    : props.anchor;
}

const styles = theme => ({
  /* Styles applied to the root element if `variant="permanent or persistent"`. */
  docked: {
    flex: "0 0 auto"
  },

  /* Styles applied to the `Paper` component. */
  paper: {
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    flex: "1 0 auto",
    zIndex: theme.zIndex.drawer,
    WebkitOverflowScrolling: "touch",
    // Add iOS momentum scrolling.
    // temporary style
    position: "fixed",
    top: 0,
    // We disable the focus ring for mouse, touch and keyboard users.
    // At some point, it would be better to keep it for keyboard users.
    // :focus-ring CSS pseudo-class will help.
    outline: "none"
  },

  /* Styles applied to the `Paper` component if `anchor="left"`. */
  paperAnchorLeft: {
    left: 0,
    right: "auto"
  },

  /* Styles applied to the `Paper` component if `anchor="right"`. */
  paperAnchorRight: {
    left: "auto",
    right: 0
  },

  /* Styles applied to the `Paper` component if `anchor="top"`. */
  paperAnchorTop: {
    top: 0,
    left: 0,
    bottom: "auto",
    right: 0,
    height: "auto",
    maxHeight: "100vh"
  },

  /* Styles applied to the `Paper` component if `anchor="bottom"`. */
  paperAnchorBottom: {
    top: "auto",
    left: 0,
    bottom: 0,
    right: 0,
    height: "auto",
    maxHeight: "100vh"
  },

  /* Styles applied to the `Paper` component if `anchor="left"` & `variant` is not "temporary". */
  paperAnchorDockedLeft: {
    borderRight: `1px solid ${theme.palette.divider}`
  },

  /* Styles applied to the `Paper` component if `anchor="top"` & `variant` is not "temporary". */
  paperAnchorDockedTop: {
    borderBottom: `1px solid ${theme.palette.divider}`
  },

  /* Styles applied to the `Paper` component if `anchor="right"` & `variant` is not "temporary". */
  paperAnchorDockedRight: {
    borderLeft: `1px solid ${theme.palette.divider}`
  },

  /* Styles applied to the `Paper` component if `anchor="bottom"` & `variant` is not "temporary". */
  paperAnchorDockedBottom: {
    borderTop: `1px solid ${theme.palette.divider}`
  },

  /* Styles applied to the `Modal` component. */
  modal: {}
});
/**
 * The properties of the [Modal](/api/modal) component are available
 * when `variant="temporary"` is set.
 */

class Drawer extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  static options; // Let's assume that the Drawer will always be rendered on user space.
  // We use this state is order to skip the appear transition during the
  // initial mount of the component.

  mounted = false;

  componentDidMount() {
    this.mounted = true;
  }

  render() {
    const {
      $system: { theme },
      anchor: anchorProp,
      children,
      classes,
      className,
      elevation,
      ModalProps: { BackdropProps: BackdropPropsProp, ...ModalProps } = {},
      onClose,
      open,
      PaperProps,
      SlideProps,
      transitionDuration,
      variant,
      ...other
    } = this.props;
    const anchor = getAnchor(this.props);
    const drawer = (
      <Paper
        elevation={variant === "temporary" ? elevation : 0}
        square
        className={classNames(
          classes.paper,
          classes[`paperAnchor${capitalize(anchor)}`],
          variant !== "temporary" &&
            classes[`paperAnchorDocked${capitalize(anchor)}`]
        )}
        {...PaperProps as any}
      >
        {children}
      </Paper>
    );

    if (variant === "permanent") {
      return (
        <div
          className={classNames(classes.docked, className)}
          {...other as any}
        >
          {drawer}
        </div>
      );
    }

    const slidingDrawer = (
      <Slide
        in={open}
        direction={oppositeDirection[anchor]}
        timeout={transitionDuration}
        appear={this.mounted}
        {...SlideProps as any}
      >
        {drawer}
      </Slide>
    );

    if (variant === "persistent") {
      return (
        <div
          className={classNames(classes.docked, className)}
          {...other as any}
        >
          {slidingDrawer}
        </div>
      );
    } // variant === temporary

    return (
      <Modal
        BackdropProps={{
          ...BackdropPropsProp,
          transitionDuration
        }}
        className={classNames(classes.modal, className)}
        open={open}
        onClose={onClose}
        {...other as any}
        {...ModalProps as any}
      >
        {slidingDrawer}
      </Modal>
    );
  }
}

export type Shape = Types.OverwriteShape<{
  common: TCommon.ShapeTexts<DrawerClassKey>,
  props: DrawerProps,
  theme: Theme
}>
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = Drawer.defaultProps = {
  anchor: 'left',
  elevation: 16,
  open: false,
  transitionDuration: {
    enter: duration.enteringScreen,
    exit: duration.leavingScreen
  },
  variant: 'temporary' // Mobile first.

} as CodeProps;
export const DrawerCode: CodeComponentType = Drawer as any
export const DrawerStyles: SheetCreatorX = styles as any
export const DrawerCreator: WithStyleCreator = withStyles<Shape>(DrawerStyles, DrawerCode, {isMui:true, defaultProps});
export const DrawerComponent: React.ComponentClass<PropsX> = DrawerCreator();
if ((Drawer as any).muiName) (DrawerComponent as any).muiName = (Drawer as any).muiName;


export default Drawer
