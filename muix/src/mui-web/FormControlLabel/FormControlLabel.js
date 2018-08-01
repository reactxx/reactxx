/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from "../Typography/Typography";
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    // For correct alignment with the text.
    verticalAlign: 'middle',
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    marginLeft: -14,
    marginRight: 16,
    // used for row presentation of radio/checkbox
    '&.disabled33': {
      cursor: 'default'
    }
  },

  /* Styles applied to the root element if `labelPlacement="start"`. */
  labelPlacementStart: {
    flexDirection: 'row-reverse'
  },

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {
    NAME$disabled33: true
  },

  /* Styles applied to the label's Typography component. */
  label: {
    '&.disabled33': {
      color: theme.palette.text.disabled
    }
  }
});
/**
 * Drop in replacement of the `Radio`, `Switch` and `Checkbox` component.
 * Use this component if you want to display an extra label.
 */

function FormControlLabel(props, context) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
    },
    checked,
    classes,
    className: classNameProp,
    control,
    disabled: disabledProp,
    inputRef,
    label,
    labelPlacement,
    name,
    onChange,
    value,
    ...other
  } = props;
  const {
    muiFormControl
  } = context;
  let disabled = disabledProp;

  if (typeof disabled === 'undefined' && typeof control.props.disabled !== 'undefined') {
    disabled = control.props.disabled;
  }

  if (typeof disabled === 'undefined' && muiFormControl) {
    disabled = muiFormControl.disabled;
  }

  const controlProps = {
    disabled
  };
  ['checked', 'name', 'onChange', 'value', 'inputRef'].forEach(key => {
    if (typeof control.props[key] === 'undefined' && typeof props[key] !== 'undefined') {
      controlProps[key] = props[key];
    }
  });
  return <label className={classNamesStr(classes.root, labelPlacement === 'start' && classes.labelPlacementStart, disabled && classes.disabled, classNameProp)} {...other}>
      {React.cloneElement(control, controlProps)}
      <Typography component="span" className={classNames(classes.label, disabled && classes.disabled)}>
        {label}
      </Typography>
    </label>;
}

FormControlLabel.contextTypes = {
  muiFormControl: PropTypes.object
};
const defaultProps = FormControlLabel.defaultProps = {
  labelPlacement: 'end'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/FormControlLabel/FormControlLabel').Shape>}
*/
export const FormControlLabelCreator = withStyles(styles, FormControlLabel, {
  isMui: true,
  defaultProps
});
const FormControlLabelComponent = FormControlLabelCreator();
if (FormControlLabel.muiName) FormControlLabelComponent.muiName = FormControlLabel.muiName;
export default FormControlLabelComponent;