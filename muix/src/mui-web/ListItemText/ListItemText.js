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
import withStyles from "../styles/withStyles";
import Typography from "../Typography/Typography";
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", "0 16px"),
    flex: "1 1 auto",
    minWidth: 0,
    "&:first-child": {
      paddingLeft: 0
    }
  },

  /* Styles applied to the root element if `inset={true}`. */
  inset: {
    "&:first-child": {
      paddingLeft: 56
    }
  },

  /* Styles applied to the root element if `context.dense` is `true`. */
  dense: {
    fontSize: theme.typography.pxToRem(13)
  },

  /* Styles applied to the primary `Typography` component. */
  primary: {
    "&.textDense55": {
      fontSize: "inherit"
    }
  },

  /* Styles applied to the secondary `Typography` component. */
  secondary: {
    "&.textDense55": {
      fontSize: "inherit"
    }
  },

  /* Styles applied to the `Typography` components if `context.dense` is `true`. */
  textDense: {
    NAME$textDense55: true
  }
});

function ListItemText(props, context) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className: classNameProp,
    disableTypography,
    inset,
    primary: primaryProp,
    primaryTypographyProps,
    secondary: secondaryProp,
    secondaryTypographyProps,
    ...other
  } = props;
  const { dense } = context;
  let primary = primaryProp != null ? primaryProp : children;

  if (primary != null && primary.type !== Typography && !disableTypography) {
    primary = (
      <Typography
        variant="subheading"
        className={classNames(classes.primary, dense && classes.textDense)}
        component="span"
        {...primaryTypographyProps}
      >
        {primary}
      </Typography>
    );
  }

  let secondary = secondaryProp;

  if (
    secondary != null &&
    secondary.type !== Typography &&
    !disableTypography
  ) {
    secondary = (
      <Typography
        variant="body1"
        className={classNames(classes.secondary, dense && classes.textDense)}
        color="textSecondary"
        {...secondaryTypographyProps}
      >
        {secondary}
      </Typography>
    );
  }

  return (
    <div
      className={classNamesStr(
        classes.root,
        dense && classes.dense,
        inset && classes.inset,
        classNameProp
      )}
      {...other}
    >
      {primary}
      {secondary}
    </div>
  );
}

ListItemText.contextTypes = {
  dense: PropTypes.bool
};
const defaultProps = (ListItemText.defaultProps = {
  disableTypography: false,
  inset: false
});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/ListItemText/ListItemText').Shape>}
 */
export const ListItemTextCreator = withStyles(styles, ListItemText, {
  isMui: true,
  defaultProps
});
const ListItemTextComponent = ListItemTextCreator();
if (ListItemText.muiName) ListItemTextComponent.muiName = ListItemText.muiName;
export default ListItemTextComponent;
