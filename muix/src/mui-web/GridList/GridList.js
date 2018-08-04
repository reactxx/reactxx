//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import { toAtomic } from "../styles/withStyles";

import PropTypes from "prop-types";
import classNames from "classnames";
import warning from "warning";
import withStyles from "../styles/withStyles";
const styles = {
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", 0),
    display: "flex",
    flexWrap: "wrap",
    overflowY: "auto",
    listStyle: "none",
    WebkitOverflowScrolling: "touch" // Add iOS momentum scrolling.
  }
};

function GridList(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    cellHeight,
    children,
    classes,
    className: classNameProp,
    cols,
    component: Component,
    spacing,
    style,
    ...other
  } = props;
  return (
    <Component
      className={classNamesAny(Component, classes.root, classNameProp)}
      style={{
        margin: -spacing / 2,
        ...style
      }}
      {...other}
    >
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) {
          return null;
        }

        warning(
          child.type !== React.Fragment,
          [
            "Material-UI: the GridList component doesn't accept a Fragment as a child.",
            "Consider providing an array instead."
          ].join("\n")
        );
        const childCols = child.props.cols || 1;
        const childRows = child.props.rows || 1;
        return React.cloneElement(child, {
          style: Object.assign(
            {
              width: `${(100 / cols) * childCols}%`,
              height:
                cellHeight === "auto"
                  ? "auto"
                  : cellHeight * childRows + spacing,
              padding: spacing / 2
            },
            child.props.style
          )
        });
      })}
    </Component>
  );
}

const defaultProps = (GridList.defaultProps = {
  cellHeight: 180,
  cols: 2,
  component: "ul",
  spacing: 4
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/GridList/GridList').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/GridList/GridList').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/GridList/GridList').Shape> } TDefaultProps */

/** @type { TComponent } */
const GridListCode = GridList;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  GridListCode as GridList,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
