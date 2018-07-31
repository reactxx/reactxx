// @inheritedComponent FormLabel
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import FormLabel from "../FormLabel/FormLabel";
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    transformOrigin: 'top left'
  },

  /* Styles applied to the root element if the component is a descendant of `FormControl`. */
  formControl: {
    position: 'absolute',
    left: 0,
    top: 0,
    // slight alteration to spec spacing to match visual spec result
    transform: 'translate(0, 24px) scale(1)'
  },

  /* Styles applied to the root element if `margin="dense"`. */
  marginDense: {
    // Compensation for the `Input.inputDense` style.
    transform: 'translate(0, 21px) scale(1)'
  },

  /* Styles applied to the `input` element if `shrink={true}`. */
  shrink: {
    transform: 'translate(0, 1.5px) scale(0.75)',
    transformOrigin: 'top left'
  },

  /* Styles applied to the `input` element if `disableAnimation={false}`. */
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
      classNamesStr,
      theme
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
const defaultProps = InputLabel.defaultProps = {
  disableAnimation: false
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/InputLabel/InputLabel').Shape>}
*/
export const InputLabelCreator = withStyles(styles, InputLabel, {
  isMui: true,
  defaultProps
});
const InputLabelComponent = InputLabelCreator();
InputLabelComponent.muiName = InputLabel.muiName;
export default InputLabelComponent;