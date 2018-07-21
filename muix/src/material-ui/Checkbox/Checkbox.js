import React from 'react';
import PropTypes from 'prop-types';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
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

function Checkbox(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    checkedIcon,
    classes,
    color,
    icon,
    indeterminate,
    indeterminateIcon,
    ...other
  } = props;
  return <SwitchBase checkedIcon={indeterminate ? indeterminateIcon : checkedIcon} classes={{
    root: classNames(classes.root, classes[`color${capitalize(color)}`]),
    checked: classes.checked,
    disabled: classes.disabled
  }} icon={indeterminate ? indeterminateIcon : icon} {...other} />;
}

const defaultProps = {
  checkedIcon: <CheckBoxIcon />,
  color: 'secondary',
  icon: <CheckBoxOutlineBlankIcon />,
  indeterminate: false,
  indeterminateIcon: <IndeterminateCheckBoxIcon />
};
const meta = {
  component: Checkbox || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;