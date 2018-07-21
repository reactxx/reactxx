import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import withStyles from '../styles/withStyles';
export const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: 56,
    backgroundColor: theme.palette.background.paper
  }
});

function BottomNavigation(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    children: childrenProp,
    classes,
    className: classNameProp,
    onChange,
    showLabels,
    value,
    ...other
  } = props;
  const className = classNames(classes.root, classNameProp);
  const children = React.Children.map(childrenProp, (child, childIndex) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    warning(child.type !== React.Fragment, ["Material-UI: the BottomNavigation component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
    const childValue = child.props.value === undefined ? childIndex : child.props.value;
    return React.cloneElement(child, {
      selected: childValue === value,
      showLabel: child.props.showLabel !== undefined ? child.props.showLabel : showLabels,
      value: childValue,
      onChange
    });
  });
  return <div className={classNamesStr(className)} {...other}>
      {children}
    </div>;
}

const defaultProps = {
  showLabels: false
};
const meta = {
  component: BottomNavigation || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;