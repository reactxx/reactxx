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
import { capitalize } from "../utils/helpers";
const SIZE = 44;

function getRelativeValue(value, min, max) {
  const clampedValue = Math.min(Math.max(min, value), max);
  return (clampedValue - min) / (max - min);
}

function easeOut(t) {
  t = getRelativeValue(t, 0, 1); // https://gist.github.com/gre/1650294

  t = (t -= 1) * t * t + 1;
  return t;
}

function easeIn(t) {
  return t * t;
}

const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: "inline-block",
    lineHeight: 1 // Keep the progress centered
  },

  /* Styles applied to the root element if `variant="static"`. */
  static: {
    transition: theme.transitions.create("transform")
  },

  /* Styles applied to the root element if `variant="indeterminate"`. */
  indeterminate: {
    animation: "mui-progress-circular-rotate 1.4s linear infinite"
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    color: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    color: theme.palette.secondary.main
  },

  /* Styles applied to the `svg` element. */
  svg: {},

  /* Styles applied to the `circle` svg path. */
  circle: {
    stroke: "currentColor" // Use butt to follow the specification, by chance, it's already the default CSS value.
    // strokeLinecap: 'butt',
  },

  /* Styles applied to the `circle` svg path if `variant="static"`. */
  circleStatic: {
    transition: theme.transitions.create("stroke-dashoffset")
  },

  /* Styles applied to the `circle` svg path if `variant="indeterminate"`. */
  circleIndeterminate: {
    animation: "mui-progress-circular-dash 1.4s ease-in-out infinite",
    // Some default value that looks fine waiting for the animation to kicks in.
    strokeDasharray: "80px, 200px",
    strokeDashoffset: "0px" // Add the unit to fix a Edge 16 and below bug.
  },
  "@keyframes mui-progress-circular-rotate": {
    "100%": {
      transform: "rotate(360deg)"
    }
  },
  "@keyframes mui-progress-circular-dash": {
    "0%": {
      strokeDasharray: "1px, 200px",
      strokeDashoffset: "0px"
    },
    "50%": {
      strokeDasharray: "100px, 200px",
      strokeDashoffset: "-15px"
    },
    "100%": {
      strokeDasharray: "100px, 200px",
      strokeDashoffset: "-120px"
    }
  }
});

/**
 * ## ARIA
 *
 * If the progress bar is describing the loading progress of a particular region of a page,
 * you should use `aria-describedby` to point to the progress bar, and set the `aria-busy`
 * attribute to `true` on that region until it has finished loading.
 */
function CircularProgress(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    classes,
    className,
    color,
    size,
    style,
    thickness,
    value,
    variant,
    ...other
  } = props;
  const circleStyle = {};
  const rootStyle = {};
  const rootProps = {};

  if (variant === "determinate" || variant === "static") {
    const circumference = 2 * Math.PI * ((SIZE - thickness) / 2);
    circleStyle.strokeDasharray = circumference.toFixed(3);
    rootProps["aria-valuenow"] = Math.round(value);

    if (variant === "static") {
      circleStyle.strokeDashoffset = `${(
        ((100 - value) / 100) *
        circumference
      ).toFixed(3)}px`;
      rootStyle.transform = "rotate(-90deg)";
    } else {
      circleStyle.strokeDashoffset = `${(
        easeIn((100 - value) / 100) * circumference
      ).toFixed(3)}px`;
      rootStyle.transform = `rotate(${(easeOut(value / 70) * 270).toFixed(
        3
      )}deg)`;
    }
  }

  return (
    <div
      className={classNamesStr(
        classes.root,
        color !== "inherit" && classes[`color${capitalize(color)}`],
        variant === "indeterminate" && classes.indeterminate,
        variant === "static" && classes.static,
        className
      )}
      style={{
        width: size,
        height: size,
        ...rootStyle,
        ...style
      }}
      role="progressbar"
      {...rootProps}
      {...other}
    >
      <svg
        className={classNamesStr(classes.svg)}
        viewBox={`${SIZE / 2} ${SIZE / 2} ${SIZE} ${SIZE}`}
      >
        <circle
          className={classNamesStr(
            classes.circle,
            variant === "indeterminate" && classes.circleIndeterminate,
            variant === "static" && classes.circleStatic
          )}
          style={circleStyle}
          cx={SIZE}
          cy={SIZE}
          r={(SIZE - thickness) / 2}
          fill="none"
          strokeWidth={thickness}
        />
      </svg>
    </div>
  );
}

const defaultProps = (CircularProgress.defaultProps = {
  color: "primary",
  size: 40,
  thickness: 3.6,
  value: 0,
  variant: "indeterminate"
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/CircularProgress/CircularProgress').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/CircularProgress/CircularProgress').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/CircularProgress/CircularProgress').Shape> } TDefaultProps */

/** @type { TComponent } */
const CircularProgressCode = CircularProgress;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  CircularProgressCode as CircularProgress,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};