//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import EventListener from "react-event-listener";
import debounce from "debounce"; // < 1kb payload overhead when lodash/debounce is > 3kb.

import withStyles from "../styles/withStyles";
const styles = {
  /* Styles applied to the root element. */
  root: {
    boxSizing: "border-box",
    flexShrink: 0
  },

  /* Styles applied to the `div` element that wraps the children. */
  tile: {
    position: "relative",
    display: "block",
    // In case it's not rendered with a div.
    height: "100%",
    overflow: "hidden"
  },

  /* Styles applied to an `ing` element child, if if needed to ensure it covers the tile. */
  imgFullHeight: {
    height: "100%",
    transform: "translateX(-50%)",
    position: "relative",
    left: "50%"
  },

  /* Styles applied to an `ing` element child, if if needed to ensure it covers the tile. */
  imgFullWidth: {
    width: "100%",
    position: "relative",
    transform: "translateY(-50%)",
    top: "50%"
  }
};

class GridListTile extends React.Component {
  imgElement = null;
  handleResize = debounce(() => {
    this.fit();
  }, 166); // Corresponds to 10 frames at 60 Hz.

  componentDidMount() {
    this.ensureImageCover();
  }

  componentDidUpdate() {
    this.ensureImageCover();
  }

  componentWillUnmount() {
    this.handleResize.clear();
  }

  fit = () => {
    const imgElement = this.imgElement;

    if (!imgElement || !imgElement.complete) {
      return;
    }

    if (
      imgElement.width / imgElement.height >
      imgElement.parentNode.offsetWidth / imgElement.parentNode.offsetHeight
    ) {
      imgElement.classList.remove(
        ...this.props.classes.imgFullWidth.split(" ")
      );
      imgElement.classList.add(...this.props.classes.imgFullHeight.split(" "));
    } else {
      imgElement.classList.remove(
        ...this.props.classes.imgFullHeight.split(" ")
      );
      imgElement.classList.add(...this.props.classes.imgFullWidth.split(" "));
    }

    imgElement.removeEventListener("load", this.fit);
  };

  ensureImageCover() {
    if (!this.imgElement) {
      return;
    }

    if (this.imgElement.complete) {
      this.fit();
    } else {
      this.imgElement.addEventListener("load", this.fit);
    }
  }

  render() {
    const {
      $system: { classNames, classNamesStr, classNamesAny, theme },
      children,
      classes,
      className,
      cols,
      component: Component,
      rows,
      ...other
    } = this.props;
    return (
      <Component
        className={classNamesAny(Component, classes.root, className)}
        {...other}
      >
        <EventListener target="window" onResize={this.handleResize} />
        <div className={classNamesStr(classes.tile)}>
          {React.Children.map(children, child => {
            if (!React.isValidElement(child)) {
              return null;
            }

            if (child.type === "img") {
              return React.cloneElement(child, {
                ref: node => {
                  this.imgElement = node;
                }
              });
            }

            return child;
          })}
        </div>
      </Component>
    );
  }
}

const defaultProps = (GridListTile.defaultProps = {
  cols: 1,
  component: "li",
  rows: 1
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/GridListTile/GridListTile').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/GridListTile/GridListTile').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/GridListTile/GridListTile').Shape> } TDefaultProps */

/** @type { TComponent } */
const GridListTileCode = GridListTile;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  GridListTileCode as GridListTile,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
