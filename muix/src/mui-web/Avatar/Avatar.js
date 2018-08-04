//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import withStyles from "../styles/withStyles";
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    width: 40,
    height: 40,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(20),
    borderRadius: "50%",
    overflow: "hidden",
    userSelect: "none"
  },

  /* Styles applied to the root element if there are children and not `src` or `srcSet` */

  /* Styles applied to the root element if `color="default"`. */
  colorDefault: {
    color: theme.palette.background.default,
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[400]
        : theme.palette.grey[600]
  },

  /* Styles applied to the img element if either `src` or `srcSet` is defined. */
  img: {
    width: "100%",
    height: "100%",
    textAlign: "center",
    // Handle non-square image. The property isn't supported by IE11.
    objectFit: "cover"
  }
});

function Avatar(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    alt,
    children: childrenProp,
    childrenClassName: childrenClassNameProp,
    classes,
    className: classNameProp,
    component: Component,
    imgProps,
    sizes,
    src,
    srcSet,
    ...other
  } = props;
  const className = classNames(
    classes.root,
    childrenProp && !src && !srcSet && classes.colorDefault,
    classNameProp
  );
  let children = null;

  if (childrenProp) {
    if (
      childrenClassNameProp &&
      typeof childrenProp !== "string" &&
      React.isValidElement(childrenProp)
    ) {
      const childrenClassName = classNames(
        childrenClassNameProp,
        childrenProp.props.className
      );
      children = React.cloneElement(childrenProp, {
        className: childrenClassName
      });
    } else {
      children = childrenProp;
    }
  } else if (src || srcSet) {
    children = (
      <img
        alt={alt}
        src={src}
        srcSet={srcSet}
        sizes={sizes}
        className={classNamesStr(classes.img)}
        {...imgProps}
      />
    );
  }

  return (
    <Component className={classNamesAny(Component, className)} {...other}>
      {children}
    </Component>
  );
}

const defaultProps = (Avatar.defaultProps = {
  component: "div"
});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Avatar/Avatar').Shape>}
 */
export const AvatarCreator = withStyles(styles, Avatar, {
  isMui: true,
  defaultProps
});
const AvatarComponent = AvatarCreator();
if (Avatar.muiName) AvatarComponent.muiName = Avatar.muiName;
export default AvatarComponent;
