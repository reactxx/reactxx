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
  checked: {
    NAME$checked63: true
  },
  disabled: {
    NAME$disabled63: true
  },
  colorPrimary: {
    '&.checked63': {
      color: theme.palette.primary.main
    },
    '&.disabled63': {
      color: theme.palette.action.disabled
    }
  },
  colorSecondary: {
    '&.checked63': {
      color: theme.palette.secondary.main
    },
    '&.disabled63': {
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

const defaultProps = {
  color: 'secondary'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Radio/Radio').Shape>}
*/
export const RadioCreator = withStyles(styles, Radio, {
  isMui: true,
  defaultProps
});
const RadioComponent = RadioCreator();
export default RadioComponent;