import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
import SwitchBase from '../internal/SwitchBase';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    display: 'inline-flex',
    width: 62,
    position: 'relative',
    flexShrink: 0,
    // For correct alignment with the text.
    verticalAlign: 'middle'
  },

  /* Styles used to create the `icon` passed to the internal `SwitchBase` component `icon` prop. */
  icon: {
    boxShadow: theme.shadows[1],
    backgroundColor: 'currentColor',
    width: 20,
    height: 20,
    borderRadius: '50%',
    NAME$icon77: true
  },

  /* Styles applied the icon element component if `checked={true}`. */
  iconChecked: {
    boxShadow: theme.shadows[2]
  },

  /* Styles applied to the internal `SwitchBase` component's `root` class. */
  switchBase: {
    zIndex: 1,
    color: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[400],
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    NAME$switchBase77: true
  },

  /* Styles applied to the internal `SwitchBase` component's `checked` class. */
  checked: {
    transform: 'translateX(14px)',
    '& + .bar77': {
      opacity: 0.5
    },
    NAME$checked77: true
  },

  /* Styles applied to the internal SwitchBase component's root element if `color="primary"`. */
  colorPrimary: {
    '&.checked77': {
      color: theme.palette.primary.main,
      '& + .bar77': {
        backgroundColor: theme.palette.primary.main
      }
    }
  },

  /* Styles applied to the internal SwitchBase component's root element if `color="secondary"`. */
  colorSecondary: {
    '&.checked77': {
      color: theme.palette.secondary.main,
      '& + .bar77': {
        backgroundColor: theme.palette.secondary.main
      }
    }
  },

  /* Styles applied to the internal SwitchBase component's disabled class. */
  disabled: {
    '& + .bar77': {
      opacity: theme.palette.type === 'light' ? 0.12 : 0.1
    },
    '& .icon77': {
      boxShadow: theme.shadows[1]
    },
    '&.switchBase77': {
      color: theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[800],
      '& + .bar77': {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white
      }
    }
  },

  /* Styles applied to the bar element. */
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
    opacity: theme.palette.type === 'light' ? 0.38 : 0.3,
    NAME$bar77: true
  }
});

function Switch(props) {
  const {
    $system: {
      classNames,
      classNamesStr,
      theme
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

const defaultProps = Switch.defaultProps = {
  color: 'secondary'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Switch/Switch').Shape>}
*/
export const SwitchCreator = withStyles(styles, Switch, {
  isMui: true,
  defaultProps
});
const SwitchComponent = SwitchCreator();
if (Switch.muiName) SwitchComponent.muiName = Switch.muiName;
export default SwitchComponent;