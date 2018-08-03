import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import withStyles from '../styles/withStyles';
import ButtonBase from "../ButtonBase/ButtonBase";
export const styles = {
  /* Styles applied to the root element. */
  root: {
    color: 'inherit',
    flex: '0 0 56px'
  }
};
/**
 * @ignore - internal component.
 */

function TabScrollButton(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      classNamesAny,
      theme
    },
    classes,
    className: classNameProp,
    direction,
    onClick,
    visible,
    ...other
  } = props;
  const className = classNames(classes.root, classNameProp);

  if (!visible) {
    return <div className={classNamesStr(className)} />;
  }

  return <ButtonBase className={className} onClick={onClick} tabIndex={-1} {...other}>
      {direction === 'left' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
    </ButtonBase>;
}

const defaultProps = TabScrollButton.defaultProps = {
  visible: true
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Tabs/TabScrollButton').Shape>}
*/
export const TabScrollButtonCreator = withStyles(styles, TabScrollButton, {
  isMui: true,
  defaultProps
});
const TabScrollButtonComponent = TabScrollButtonCreator();
if (TabScrollButton.muiName) TabScrollButtonComponent.muiName = TabScrollButton.muiName;
export default TabScrollButtonComponent;