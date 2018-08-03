import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    width: '100%',
    transition: theme.transitions.create(),
    willChange: 'left, width'
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    backgroundColor: theme.palette.primary.main
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main
  }
});
/**
 * @ignore - internal component.
 */

function TabIndicator(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    classes,
    className,
    color,
    ...other
  } = props;
  return <span className={classNamesStr(classes.root, classes[`color${capitalize(color)}`], className)} {...other} />;
}

const defaultProps = TabIndicator.defaultProps = {};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Tabs/TabIndicator').Shape>}
*/
export const TabIndicatorCreator = withStyles(styles, TabIndicator, {
  isMui: true,
  defaultProps
});
const TabIndicatorComponent = TabIndicatorCreator();
if (TabIndicator.muiName) TabIndicatorComponent.muiName = TabIndicator.muiName;
export default TabIndicatorComponent;