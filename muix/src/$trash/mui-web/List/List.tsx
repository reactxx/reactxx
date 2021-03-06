//autogenerated--------------------------------------------------------------------
// 
// This code was generated from material-ui v3.0.0 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
// 
//----------------------------------------------------------------------------------

import { TCommon, Types, TProvider, WithStyleCreator as TWithStyleCreator } from 'reactxx-basic';
import withStyles, { Theme, toAtomic } from '../styles/withStyles';
import React from "react";
import PropTypes from "prop-types";
import { classNames } from "reactxx-basic";
import { StandardProps } from "..";
export interface ListProps
  extends StandardProps<React.HTMLAttributes<HTMLUListElement>, ListClassKey> {
  component?: React.ReactType<ListProps>;
  dense?: boolean;
  disablePadding?: boolean;
  subheader?: React.ReactElement<any>;
}
export type ListClassKey = "root" | "padding" | "dense" | "subheader";
const styles = {
  /* Styles applied to the root element. */
  root: {
    $web: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      position: "relative"
    }
  },

  /* Styles applied to the root element if `disablePadding={false}`. */
  padding: {
    $web: {
      paddingTop: 8,
      paddingBottom: 8
    }
  },

  /* Styles applied to the root element if `dense={true}` & `disablePadding={false}`. */
  dense: {
    $web: {
      paddingTop: 4,
      paddingBottom: 4
    }
  },

  /* Styles applied to the root element if a `subheader` is provided. */
  subheader: {
    $web: {
      paddingTop: 0
    }
  }
};

class List extends React.Component<CodeProps, any> {
  static defaultProps: CodeProps;
  static muiName;
  static displayName;
  static contextTypes;
  static childContextTypes;
  static options;

  getChildContext() {
    return {
      dense: this.props.dense
    };
  }

  render() {
    const {
      $system: { theme },
      children,
      classes,
      className: classNameProp,
      component: Component,
      dense,
      disablePadding,
      subheader,
      ...other
    } = this.props;
    const className = classNames(
      classes.root,
      dense && !disablePadding && classes.dense,
      !disablePadding && classes.padding,
      subheader && classes.subheader,
      classNameProp
    );
    return (
      <Component className={className} {...other as any}>
        {subheader}
        {children}
      </Component>
    );
  }
}

List.childContextTypes = {
  dense: PropTypes.bool
};

export interface Shape extends Types.ShapeDefault {
  common: TCommon.ShapeTexts<ListClassKey>,
  props: ListProps
  style: 'Text'
  theme: Theme
}
export type ComponentType = React.ComponentClass<Types.PropsX<Shape>> & TProvider<Shape>
export type CodeComponentType = Types.CodeComponentType<Shape>
export type SheetCreatorX = Types.SheetCreatorX<Shape>
export type PropsX = Types.PropsX<Shape>
export type CodeProps = Types.CodePropsWeb<Shape>
export type WithStyleCreator = TWithStyleCreator<Shape>

export const defaultProps  = List.defaultProps = {
  component: 'ul',
  dense: false,
  disablePadding: false
} as CodeProps;
export const ListCode: CodeComponentType = List as any
export const ListStyles: SheetCreatorX = styles as any
export const ListCreator: WithStyleCreator = withStyles<Shape>(ListStyles, ListCode, {isMui:true, defaultProps});
export const ListComponent: React.ComponentClass<PropsX> = ListCreator();
if ((List as any).muiName) (ListComponent as any).muiName = (List as any).muiName;


export default ListComponent
