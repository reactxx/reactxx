// @inheritedComponent ButtonBase
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import ButtonBase from "../ButtonBase/ButtonBase";
import StepLabel from '../StepLabel';
import { isMuiElement } from '../utils/reactHelpers';
export const styles = {
  /* Styles applied to the root element. */
  root: {
    width: '100%',
    padding: '24px 16px',
    margin: '-24px -16px',
    boxSizing: 'content-box'
  },

  /* Styles applied to the root element if `orientation="horizontal"`. */
  horizontal: {},

  /* Styles applied to the root element if `orientation="vertical"`. */
  vertical: {
    justifyContent: 'flex-start'
  },

  /* Styles applied to the `ButtonBase` touch-ripple. */
  touchRipple: {
    color: 'rgba(0, 0, 0, 0.3)'
  }
};

function StepButton(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    disabled,
    icon,
    last,
    optional,
    orientation,
    ...other
  } = props;
  const childProps = {
    active,
    alternativeLabel,
    completed,
    disabled,
    icon,
    optional,
    orientation
  };
  const child = isMuiElement(children, ['StepLabel']) ? React.cloneElement(children, childProps) : <StepLabel {...childProps}>{children}</StepLabel>;
  return <ButtonBase disabled={disabled} TouchRippleProps={{
    className: classes.touchRipple
  }} className={classNames(classes.root, classes[orientation], classNameProp)} {...other}>
      {child}
    </ButtonBase>;
}

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/StepButton/StepButton').Shape>}
*/
export const StepButtonCreator = withStyles(styles, StepButton, {
  isMui: true,
  defaultProps
});
const StepButtonComponent = StepButtonCreator();
export default StepButtonComponent;