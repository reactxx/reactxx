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
import Typography from "../Typography/Typography";

const styles = theme => ({
  /* Styles applied to the root element. */
  root: theme.mixins.gutters({
    display: "flex",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16
  }),

  /* Styles applied to the avatar element. */
  avatar: {
    flex: "0 0 auto",
    marginRight: 16
  },

  /* Styles applied to the action element. */
  action: {
    flex: "0 0 auto",
    alignSelf: "flex-start",
    marginTop: -8,
    marginRight: -12,
    [theme.breakpoints.up("sm")]: {
      marginRight: -20
    }
  },

  /* Styles applied to the content wrapper element. */
  content: {
    flex: "1 1 auto"
  },

  /* Styles applied to the title Typography element. */
  title: {},

  /* Styles applied to the subheader Typography element. */
  subheader: {}
});

function CardHeader(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    action,
    avatar,
    classes,
    className: classNameProp,
    component: Component,
    disableTypography,
    subheader: subheaderProp,
    subheaderTypographyProps,
    title: titleProp,
    titleTypographyProps,
    ...other
  } = props;
  let title = titleProp;

  if (title != null && title.type !== Typography && !disableTypography) {
    title = (
      <Typography
        variant={avatar ? "body2" : "headline"}
        className={classes.title}
        component="span"
        {...titleTypographyProps}
      >
        {title}
      </Typography>
    );
  }

  let subheader = subheaderProp;

  if (
    subheader != null &&
    subheader.type !== Typography &&
    !disableTypography
  ) {
    subheader = (
      <Typography
        variant={avatar ? "body2" : "body1"}
        className={classes.subheader}
        color="textSecondary"
        component="span"
        {...subheaderTypographyProps}
      >
        {subheader}
      </Typography>
    );
  }

  return (
    <Component
      className={classNamesAny(Component, classes.root, classNameProp)}
      {...other}
    >
      {avatar && <div className={classNamesStr(classes.avatar)}>{avatar}</div>}
      <div className={classNamesStr(classes.content)}>
        {title}
        {subheader}
      </div>
      {action && <div className={classNamesStr(classes.action)}>{action}</div>}
    </Component>
  );
}

const defaultProps = (CardHeader.defaultProps = {
  component: "div",
  disableTypography: false
});

/** @typedef { import('reactxx-basic').Types.CodeComponentType<import('../typings/shapes/CardHeader/CardHeader').Shape> } TComponent */

/** @typedef { import('reactxx-basic').Types.SheetCreatorX<import('../typings/shapes/CardHeader/CardHeader').Shape> } TStyles */

/** @typedef { import('reactxx-basic').Types.PropsX<import('../typings/shapes/CardHeader/CardHeader').Shape> } TDefaultProps */

/** @type { TComponent } */
const CardHeaderCode = CardHeader;
/** @type { TStyles } */

const stylesCode = styles;
/** @type { TDefaultProps } */

const defaultPropsCode = defaultProps;
export {
  CardHeaderCode as CardHeader,
  stylesCode as styles,
  defaultPropsCode as defaultProps
};