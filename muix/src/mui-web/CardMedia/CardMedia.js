//----------------------------------------------------------------------------------
//
// This code was generated from material-ui v1.4.2 by reactxx-codemod tool
// (https://github.com/reactxx/reactxx/tree/master/codemod)
//
//----------------------------------------------------------------------------------

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import warning from "warning";
import withStyles from "../styles/withStyles";
const styles = {
  /* Styles applied to the root element. */
  root: {
    display: "block",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  },

  /* Styles applied to the root element if `component="video, audio, picture, iframe, or img"`. */
  media: {
    width: "100%"
  }
};
const MEDIA_COMPONENTS = ["video", "audio", "picture", "iframe", "img"];

function CardMedia(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    component: Component,
    image,
    src,
    style,
    ...other
  } = props;
  warning(
    Boolean(image || src),
    "Material-UI: either `image` or `src` property must be specified."
  );
  const isMediaComponent = MEDIA_COMPONENTS.indexOf(Component) !== -1;
  const composedStyle =
    !isMediaComponent && image
      ? {
          backgroundImage: `url("${image}")`,
          ...style
        }
      : style;
  return (
    <Component
      className={classNamesAny(
        Component,
        classes.root,
        isMediaComponent && classes.media,
        className
      )}
      style={composedStyle}
      src={isMediaComponent ? image || src : undefined}
      {...other}
    />
  );
}

const defaultProps = (CardMedia.defaultProps = {
  component: "div"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/CardMedia/CardMedia').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/CardMedia/CardMedia').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/CardMedia/CardMedia').Shape> } TDefaultProps */

/** @type { TComponent } */
const CardMediaCode = CardMedia;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  CardMediaCode as CardMedia,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};
