/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import Typography from '../Typography';
export const styles = theme => ({
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
    '&$disabled': {
      cursor: 'default'
    }
  },
  disabled: {},
  label: {
    '&$disabled': {
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
      classNamesStr
    },
    checked,
    classes,
    className: classNameProp,
    control,
    disabled: disabledProp,
    inputRef,
    label,
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
  return <label className={classNamesStr(classes.root, disabled && classes.disabled, classNameProp)} {...other}>
      {React.cloneElement(control, controlProps)}
      <Typography component="span" className={classNames(classes.label, disabled && classes.disabled)}>
        {label}
      </Typography>
    </label>;
}

FormControlLabel.contextTypes = {
  muiFormControl: PropTypes.object
};
export default withStyles(styles, {
  name: 'MuiFormControlLabel'
})(FormControlLabel);