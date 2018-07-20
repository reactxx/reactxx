// @inheritedComponent FormLabel
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import FormLabel from '../FormLabel';
export const styles = theme => ({
  root: {
    transformOrigin: 'top left'
  },
  formControl: {
    position: 'absolute',
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: 'translate(0, 24px) scale(1)'
  },
  marginDense: {
    // Compensation for the `Input.inputDense` style.
    transform: 'translate(0, 21px) scale(1)'
  },
  shrink: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left'
  },
  animated: {
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shorter,
      easing: theme.transitions.easing.easeOut
    })
  }
});

function InputLabel(props, context) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children,
    classes,
    className: classNameProp,
    disableAnimation,
    FormLabelClasses,
    margin: marginProp,
    shrink: shrinkProp,
    ...other
  } = props;
  const {
    muiFormControl
  } = context;
  let shrink = shrinkProp;

  if (typeof shrink === 'undefined' && muiFormControl) {
    shrink = muiFormControl.filled || muiFormControl.focused || muiFormControl.adornedStart;
  }

  let margin = marginProp;

  if (typeof margin === 'undefined' && muiFormControl) {
    margin = muiFormControl.margin;
  }

  const className = classNames(classes.root, muiFormControl && classes.formControl, !disableAnimation && classes.animated, shrink && classes.shrink, margin === 'dense' && classes.marginDense, classNameProp);
  return <FormLabel data-shrink={shrink} className={className} classes={FormLabelClasses} {...other}>
      {children}
    </FormLabel>;
}

InputLabel.contextTypes = {
  muiFormControl: PropTypes.object
};
export default withStyles(styles, {
  name: 'MuiInputLabel',
  defaultProps: {
    disableAnimation: false
  }
})(InputLabel);