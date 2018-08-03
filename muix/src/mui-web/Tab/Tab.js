// @inheritedComponent ButtonBase
import React from 'react';
import { toAtomic } from '../styles/withStyles';

import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import ButtonBase from "../ButtonBase/ButtonBase";
import { capitalize } from '../utils/helpers';
import unsupportedProp from '../utils/unsupportedProp';
export const styles = theme => ({
  /* Styles applied to the root element. */
  root: { ...toAtomic('padding', 0),
    ...theme.typography.button,
    maxWidth: 264,
    position: 'relative',
    minWidth: 72,
    minHeight: 48,
    flexShrink: 0,
    overflow: 'hidden',
    [theme.breakpoints.up('md')]: {
      minWidth: 160
    }
  },

  /* Styles applied to the root element if both `icon` and `label` are provided. */
  labelIcon: {
    minHeight: 72
  },

  /* Styles applied to the root element if `textColor="inherit"`. */
  textColorInherit: {
    color: 'inherit',
    opacity: 0.7,
    '&.selected77': {
      opacity: 1
    },
    '&.disabled77': {
      opacity: 0.4
    }
  },

  /* Styles applied to the root element if `textColor="primary"`. */
  textColorPrimary: {
    color: theme.palette.text.secondary,
    '&.selected77': {
      color: theme.palette.primary.main
    },
    '&.disabled77': {
      color: theme.palette.text.disabled
    }
  },

  /* Styles applied to the root element if `textColor="secondary"`. */
  textColorSecondary: {
    color: theme.palette.text.secondary,
    '&.selected77': {
      color: theme.palette.secondary.main
    },
    '&.disabled77': {
      color: theme.palette.text.disabled
    }
  },

  /* Styles applied to the root element if `selected={true}` (controlled by the Tabs component). */
  selected: {
    NAME$selected77: true
  },

  /* Styles applied to the root element if `disabled={true}` (controlled by the Tabs component). */
  disabled: {
    NAME$disabled77: true
  },

  /* Styles applied to the root element if `fullWidth={true}` (controlled by the Tabs component). */
  fullWidth: {
    flexShrink: 1,
    flexGrow: 1,
    maxWidth: 'auto'
  },

  /* Styles applied to the `icon` and `label`'s wrapper element. */
  wrapper: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'column'
  },

  /* Styles applied to the label container element if `label` is provided. */
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

  /* Styles applied to the label wrapper element if `label` is provided. */
  label: {
    fontSize: theme.typography.pxToRem(14),
    whiteSpace: 'normal',
    [theme.breakpoints.up('md')]: {
      fontSize: theme.typography.pxToRem(13)
    }
  },

  /* Styles applied to the label wrapper element if `label` is provided and the text is wrapped. */
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
    if (this.labelRef) {
      const labelWrapped = this.labelRef.getClientRects().length > 1;

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
        classNamesStr,
        classNamesAny,
        theme
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
          <span className={classNamesStr(classes.label, this.state.labelWrapped && classes.labelWrapped)} ref={ref => {
          this.labelRef = ref;
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

const defaultProps = Tab.defaultProps = {
  disabled: false,
  textColor: 'inherit'
};

/**
* @type { import('reactxx-basic').WithStyleCreator<import('../typings/shapes/Tab/Tab').Shape>}
*/
export const TabCreator = withStyles(styles, Tab, {
  isMui: true,
  defaultProps
});
const TabComponent = TabCreator();
if (Tab.muiName) TabComponent.muiName = Tab.muiName;
export default TabComponent;