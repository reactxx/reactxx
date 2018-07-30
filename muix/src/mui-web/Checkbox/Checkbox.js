import React from 'react';
import PropTypes from 'prop-types';
import SwitchBase from '../internal/SwitchBase';
import CheckBoxOutlineBlankIcon from '../internal/svg-icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '../internal/svg-icons/CheckBox';
import IndeterminateCheckBoxIcon from '../internal/svg-icons/IndeterminateCheckBox';
import { capitalize } from '../utils/helpers';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    color: theme.palette.text.secondary
  },

  /* Styles applied to the root element if `checked={true}`. */
  checked: {
    NAME$checked16: true
  },

  /* Styles applied to the root element if `disabled={true}`. */
  disabled: {
    NAME$disabled16: true
  },

  /* Styles applied to the root element if `color="primary"`. */
  colorPrimary: {
    '&.checked16': {
      color: theme.palette.primary.main
    },
    '&.disabled16': {
      color: theme.palette.action.disabled
    }
  },

  /* Styles applied to the root element if `color="secondary"`. */
  colorSecondary: {
    '&.checked16': {
      color: theme.palette.secondary.main
    },
    '&.disabled16': {
      color: theme.palette.action.disabled
    }
  }
});

function Checkbox(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
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

const defaultProps = Checkbox.defaultProps = {
  checkedIcon: <CheckBoxIcon />,
  color: 'secondary',
  icon: <CheckBoxOutlineBlankIcon />,
  indeterminate: false,
  indeterminateIcon: <IndeterminateCheckBoxIcon />
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Checkbox/Checkbox').Shape>}
*/
export const CheckboxCreator = withStyles(styles, Checkbox, {
  isMui: true,
  defaultProps
});
const CheckboxComponent = CheckboxCreator();
export default CheckboxComponent;