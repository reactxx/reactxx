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
export const styles = {
  /* Styles applied to the root element. */
  root: {
    ...toAtomic("padding", "24px 24px 20px"),
    ...toAtomic("margin", 0),
    flex: "0 0 auto"
  }
};

function DialogTitle(props) {
  const {
    $system: { classNames, classNamesStr, classNamesAny, theme },
    children,
    classes,
    className,
    disableTypography,
    ...other
  } = props;
  return (
    <div className={classNamesStr(classes.root, className)} {...other}>
      {disableTypography ? (
        children
      ) : (
        <Typography variant="title">{children}</Typography>
      )}
    </div>
  );
}

const defaultProps = (DialogTitle.defaultProps = {
  disableTypography: false
});

/**
 * @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/DialogTitle/DialogTitle').Shape>}
 */
export const DialogTitleCreator = withStyles(styles, DialogTitle, {
  isMui: true,
  defaultProps
});
const DialogTitleComponent = DialogTitleCreator();
if (DialogTitle.muiName) DialogTitleComponent.muiName = DialogTitle.muiName;
export default DialogTitleComponent;
