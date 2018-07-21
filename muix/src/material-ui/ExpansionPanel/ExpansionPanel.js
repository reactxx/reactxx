// @inheritedComponent Paper
import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import Collapse from '../Collapse';
import Paper from '../Paper';
import withStyles from '../styles/withStyles';
import { isMuiElement } from '../utils/reactHelpers'; // Workaround https://github.com/jsdom/jsdom/issues/2026

const edgeFix = typeof window !== 'undefined' && /jsdom/.test(window.navigator.userAgent) ? {} : {
  // Fix a rendering issue on Edge
  '@supports (-ms-ime-align: auto)': {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
  }
};
export const styles = theme => {
  const transition = {
    duration: theme.transitions.duration.shortest
  };
  return {
    root: {
      position: 'relative',
      transition: theme.transitions.create(['margin'], transition),
      '&:before': {
        position: 'absolute',
        left: 0,
        top: -1,
        right: 0,
        height: 1,
        content: '""',
        opacity: 1,
        backgroundColor: theme.palette.divider,
        transition: theme.transitions.create(['opacity', 'background-color'], transition)
      },
      '&:first-child': {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
        '&:before': {
          display: 'none'
        }
      },
      '&:last-child': {
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        ...edgeFix
      },
      '&$expanded + &': {
        '&:before': {
          display: 'none'
        }
      }
    },
    expanded: {
      margin: '16px 0',
      '&:first-child': {
        marginTop: 0
      },
      '&:last-child': {
        marginBottom: 0
      },
      '&:before': {
        opacity: 0
      }
    },
    disabled: {
      backgroundColor: theme.palette.action.disabledBackground
    }
  };
};

class ExpansionPanel extends React.Component {
  isControlled = null;

  constructor(props) {
    super(props);
    this.isControlled = props.expanded != null;

    if (!this.isControlled) {
      // not controlled, use internal state
      this.state.expanded = props.defaultExpanded !== undefined ? props.defaultExpanded : false;
    }
  }

  state = {};
  handleChange = event => {
    const expanded = this.isControlled ? this.props.expanded : this.state.expanded;

    if (!this.isControlled) {
      this.setState({
        expanded: !expanded
      });
    }

    if (this.props.onChange) {
      this.props.onChange(event, !expanded);
    }
  };

  render() {
    const {
      $system: {
        classNames,
        classNamesStr
      },
      children: childrenProp,
      classes,
      className: classNameProp,
      CollapseProps: CollapsePropsProp,
      defaultExpanded,
      disabled,
      expanded: expandedProp,
      onChange,
      ...other
    } = this.props;
    const expanded = this.isControlled ? expandedProp : this.state.expanded;
    const className = classNames(classes.root, expanded && classes.expanded, disabled && classes.disabled, classNameProp);
    let summary = null;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      warning(child.type !== React.Fragment, ["Material-UI: the ExpansionPanel component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));

      if (isMuiElement(child, ['ExpansionPanelSummary'])) {
        summary = React.cloneElement(child, {
          disabled,
          expanded,
          onChange: this.handleChange
        });
        return null;
      }

      return child;
    });
    const CollapseProps = !expanded ? {
      'aria-hidden': 'true'
    } : null;
    return <Paper className={className} elevation={1} square {...other}>
        {summary}
        <Collapse in={expanded} timeout="auto" {...CollapseProps} {...CollapsePropsProp}>
          {children}
        </Collapse>
      </Paper>;
  }

}

const defaultProps = {
  defaultExpanded: false,
  disabled: false
};
const meta = {
  component: ExpansionPanel || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;