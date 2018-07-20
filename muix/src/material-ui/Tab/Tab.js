// @inheritedComponent ButtonBase
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import { capitalize } from '../utils/helpers';
import unsupportedProp from '../utils/unsupportedProp';
export const styles = theme => ({
  root: { ...theme.typography.button,
    maxWidth: 264,
    position: 'relative',
    minWidth: 72,
    padding: 0,
    minHeight: 48,
    flexShrink: 0,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      minWidth: 160
    }
  },
  labelIcon: {
    minHeight: 72
  },
  textColorInherit: {
    color: 'inherit',
    opacity: 0.7,
    '&$selected': {
      opacity: 1
    },
    '&$disabled': {
      opacity: 0.4
    }
  },
  textColorPrimary: {
    color: theme.palette.text.secondary,
    '&$selected': {
      color: theme.palette.primary.main
    },
    '&$disabled': {
      color: theme.palette.text.disabled
    }
  },
  textColorSecondary: {
    color: theme.palette.text.secondary,
    '&$selected': {
      color: theme.palette.secondary.main
    },
    '&$disabled': {
      color: theme.palette.text.disabled
    }
  },
  selected: {},
  disabled: {},
  fullWidth: {
    flexShrink: 1,
    flexGrow: 1
  },
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column'
  },
  labelContainer: {
    paddingTop: 6,
    paddingBottom: 6,
    paddingLeft: 12,
    paddingRight: 12,
    [theme.breakpoints.up('md')]: {
      paddingLeft: 24,
      paddingRight: 24
    }
  },
  label: {
    fontSize: theme.typography.pxToRem(14),
    whiteSpace: 'normal',
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(13)
    }
  },
  labelWrapped: {
    [theme.breakpoints.down('sm')]: {
      fontSize: theme.typography.pxToRem(12)
    }
  }
});

class Tab extends React.Component {
  label = null;
  state = {
    labelWrapped: false
  };

  componentDidMount() {
    this.checkTextWrap();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.labelWrapped === prevState.labelWrapped) {
      /**
             * At certain text and tab lengths, a larger font size may wrap to two lines while the smaller
             * font size still only requires one line.  This check will prevent an infinite render loop
             * fron occurring in that scenario.
             */
      this.checkTextWrap();
    }
  }

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
  checkTextWrap = () => {
    if (this.label) {
      const labelWrapped = this.label.getClientRects().length > 1;

      if (this.state.labelWrapped !== labelWrapped) {
        this.setState({
          labelWrapped
        });
      }
    }
  };

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
      classes,
      className: classNameProp,
      disabled,
      fullWidth,
      icon,
      indicator,
      label: labelProp,
      onChange,
      selected,
      textColor,
      value,
      ...other
    } = this.props;
    let label;

    if (labelProp !== undefined) {
      label = <span className={classNamesStr(classes.labelContainer)}>
          <span className={classNamesStr(classes.label, this.state.labelWrapped && classes.labelWrapped)} ref={node => {
          this.label = node;
        }}>
            {labelProp}
          </span>
        </span>;
    }

    const className = classNames(classes.root, classes[`textColor${capitalize(textColor)}`], disabled && classes.disabled, selected && classes.selected, icon && label && classes.labelIcon, fullWidth && classes.fullWidth, classNameProp);
    return <ButtonBase focusRipple className={className} role="tab" aria-selected={selected} disabled={disabled} {...other} onClick={this.handleChange}>
        <span className={classNamesStr(classes.wrapper)}>
          {icon}
          {label}
        </span>
        {indicator}
      </ButtonBase>;
  }

}

export default withStyles(styles, {
  name: 'MuiTab',
  defaultProps: {
    disabled: false,
    textColor: 'inherit'
  }
})(Tab);