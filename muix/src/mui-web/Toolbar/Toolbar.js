import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center'
  },

  /* Styles applied to the root element if `disableGutters={false}`. */
  gutters: theme.mixins.gutters(),

  /* Styles applied to the root element if `variant="regular"`. */
  regular: theme.mixins.toolbar,

  /* Styles applied to the root element if `variant="dense"`. */
  dense: {
    minHeight: 48
  }
});

function Toolbar(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    children,
    classes,
    className: classNameProp,
    disableGutters,
    variant,
    ...other
  } = props;
  const className = classNames(classes.root, classes[variant], !disableGutters && classes.gutters, classNameProp);
  return <div className={classNamesStr(className)} {...other}>
      {children}
    </div>;
}

const defaultProps = Toolbar.defaultProps = {
  disableGutters: false,
  variant: 'regular'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Toolbar/Toolbar').Shape>}
*/
export const ToolbarCreator = withStyles(styles, Toolbar, {
  isMui: true,
  defaultProps
});
const ToolbarComponent = ToolbarCreator();
ToolbarComponent.muiName = Toolbar.muiName;
export default ToolbarComponent;