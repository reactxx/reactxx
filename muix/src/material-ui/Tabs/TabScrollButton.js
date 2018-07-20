import React from 'react';
import PropTypes from 'prop-types';
import KeyboardArrowLeft from '../internal/svg-icons/KeyboardArrowLeft';
import KeyboardArrowRight from '../internal/svg-icons/KeyboardArrowRight';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
export const styles = {
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
      classNamesStr
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

export default withStyles(styles, {
  name: 'MuiTabScrollButton',
  defaultProps: {
    visible: true
  }
})(TabScrollButton);