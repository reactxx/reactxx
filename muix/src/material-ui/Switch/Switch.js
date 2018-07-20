import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import SwitchBase from '../internal/SwitchBase';
export const styles = theme => ({
  root: {
    display: 'inline-flex',
    width: 62,
    position: 'relative',
    flexShrink: 0,
    // For correct alignment with the text.
    verticalAlign: 'middle'
  },
  icon: {
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%'
  },
  iconChecked: {
    boxShadow: theme.shadows[2]
  },
  switchBase: {
    zIndex: 1,
    color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  checked: {
    transform: 'translateX(14px)',
    '& + $bar': {
      opacity: 0.5
    }
  },
  colorPrimary: {
    '&$checked': {
      color: theme.palette.primary.main,
      '& + $bar': {
        backgroundColor: theme.palette.primary.main
      }
    }
  },
  colorSecondary: {
    '&$checked': {
      color: theme.palette.secondary.main,
      '& + $bar': {
        backgroundColor: theme.palette.secondary.main
      }
    }
  },
  disabled: {
    '& + $bar': {
      opacity: theme.palette.type === 'light' ? 0.12 : 0.1
    },
    '& $icon': {
      boxShadow: theme.shadows[1]
    },
    '&$switchBase': {
      color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
      '& + $bar': {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
      }
    }
  },
  bar: {
    borderRadius: 14 / 2,
    display: 'block',
    position: 'absolute',
    width: 34,
    height: 14,
    top: '50%',
    left: '50%',
    marginTop: -7,
    marginLeft: -17,
    transition: theme.transitions.create(['opacity', 'background-color'], {
      duration: theme.transitions.duration.shortest
    }),
    backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    opacity: theme.palette.type === 'light' ? 0.38 : 0.3
  }
});

function Switch(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    className,
    color,
    ...other
  } = props;
  return <span className={classNamesStr(classes.root, className)}>
      <SwitchBase icon={<span className={classNamesStr(classes.icon)} />} classes={{
      root: classNames(classes.switchBase, classes[`color${capitalize(color)}`]),
      checked: classes.checked,
      disabled: classes.disabled
    }} checkedIcon={<span className={classNamesStr(classes.icon, classes.iconChecked)} />} {...other} />
      <span className={classNamesStr(classes.bar)} />
    </span>;
}

export default withStyles(styles, {
  name: 'MuiSwitch',
  defaultProps: {
    color: 'secondary'
  }
})(Switch);