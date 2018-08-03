// @inheritedComponent ButtonBase
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from "../ButtonBase/ButtonBase";
import unsupportedProp from '../utils/unsupportedProp';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: {
    transition: theme.transitions.create(['color', 'padding-top'], {
      duration: theme.transitions.duration.short
    }),
    paddingTop: 8,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 12,
    minWidth: 80,
    maxWidth: 168,
    color: theme.palette.text.secondary,
    flex: '1',
    '&.iconOnly6': {
      paddingTop: 16
    },
    '&.selected6': {
      paddingTop: 6,
      color: theme.palette.primary.main
    }
  },

  /* Styles applied to the root element if selected. */
  selected: {
    NAME$selected6: true
  },

  /* Styles applied to the root element if `showLabel={false}` and not selected. */
  iconOnly: {
    NAME$iconOnly6: true
  },

  /* Styles applied to the span element that wraps the icon and label. */
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column'
  },

  /* Styles applied to the label's span element. */
  label: {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    opacity: 1,
    transition: 'font-size 0.2s, opacity 0.2s',
    transitionDelay: '0.1s',
    '&.iconOnly6': {
      opacity: 0,
      transitionDelay: '0s'
    },
    '&.selected6': {
      fontSize: theme.typography.pxToRem(14)
    }
  }
});

class BottomNavigationAction extends React.Component {
  handleChange = event => {
    const {
      onChange,
      value,
      onClick
    } = this.props;

    if (onChange) {
      onChange(event, value);
    }

    if (onClick) {
      onClick(event);
    }
  };

  render() {
    const {
      $system: {
        classNames,
        classNamesStr,
        classNamesAny,
        theme
      },
      classes,
      className: classNameProp,
      icon,
      label,
      onChange,
      onClick,
      selected,
      showLabel: showLabelProp,
      value,
      ...other
    } = this.props;
    const className = classNames(classes.root, selected && classes.selected, !showLabelProp && !selected && classes.iconOnly, classNameProp);
    const labelClassName = classNames(classes.label, selected && classes.selected, !showLabelProp && !selected && classes.iconOnly);
    return <ButtonBase className={className} focusRipple onClick={this.handleChange} {...other}>
        <span className={classNamesStr(classes.wrapper)}>
          {icon}
          <span className={classNamesStr(labelClassName)}>{label}</span>
        </span>
      </ButtonBase>;
  }

}

const defaultProps = BottomNavigationAction.defaultProps = {};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/BottomNavigationAction/BottomNavigationAction').Shape>}
*/
export const BottomNavigationActionCreator = withStyles(styles, BottomNavigationAction, {
  isMui: true,
  defaultProps
});
const BottomNavigationActionComponent = BottomNavigationActionCreator();
if (BottomNavigationAction.muiName) BottomNavigationActionComponent.muiName = BottomNavigationAction.muiName;
export default BottomNavigationActionComponent;