import React from 'react';
import PropTypes from 'prop-types';
import SwitchBase from '../internal/SwitchBase';
import RadioButtonUncheckedIcon from '../internal/svg-icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '../internal/svg-icons/RadioButtonChecked';
import { capitalize } from '../utils/helpers';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    color: theme.palette.text.secondary
  },
  checked: {},
  disabled: {},
  colorPrimary: {
    '&$checked': {
      color: theme.palette.primary.main
    },
    '&$disabled': {
      color: theme.palette.action.disabled
    }
  },
  colorSecondary: {
    '&$checked': {
      color: theme.palette.secondary.main
    },
    '&$disabled': {
      color: theme.palette.action.disabled
    }
  }
});

function Radio(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    color,
    ...other
  } = props;
  return <SwitchBase type="radio" icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />} classes={{
    root: classNames(classes.root, classes[`color${capitalize(color)}`]),
    checked: classes.checked,
    disabled: classes.disabled
  }} {...other} />;
}

export default withStyles(styles, {
  name: 'MuiRadio',
  defaultProps: {
    color: 'secondary'
  }
})(Radio);