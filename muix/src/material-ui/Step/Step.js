import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import withStyles from '../styles/withStyles';
export const styles = {
  root: {},
  horizontal: {
    paddingLeft: 8,
    paddingRight: 8,
    '&:first-child': {
      paddingLeft: 0
    },
    '&:last-child': {
      paddingRight: 0
    }
  },
  vertical: {},
  alternativeLabel: {
    flex: 1,
    position: 'relative'
  }
};

function Step(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    active,
    alternativeLabel,
    children,
    classes,
    className: classNameProp,
    completed,
    connector,
    disabled,
    index,
    last,
    orientation,
    ...other
  } = props;
  const className = classNames(classes.root, classes[orientation], alternativeLabel && classes.alternativeLabel, classNameProp);
  return <div className={classNamesStr(className)} {...other}>
      {React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      warning(child.type !== React.Fragment, ["Material-UI: the Step component doesn't accept a Fragment as a child.", 'Consider providing an array instead.'].join('\n'));
      return React.cloneElement(child, {
        active,
        alternativeLabel,
        completed,
        disabled,
        icon: index + 1,
        last,
        orientation,
        ...child.props
      });
    })}
      {connector && alternativeLabel && !last && React.cloneElement(connector, {
      orientation,
      alternativeLabel
    })}
    </div>;
}

const defaultProps = {
  active: false,
  completed: false,
  disabled: false
};
const meta = {
  component: Step || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;