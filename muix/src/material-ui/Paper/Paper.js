import React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import withStyles from '../styles/withStyles';
export const styles = theme => {
  const elevations = {};
  theme.shadows.forEach((shadow, index) => {
    elevations[`elevation${index}`] = {
      boxShadow: shadow
    };
  });
  return {
    root: {
      backgroundColor: theme.palette.background.paper
    },
    rounded: {
      borderRadius: theme.shape.borderRadius
    },
    ...elevations
  };
};

function Paper(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    classes,
    className: classNameProp,
    component: Component,
    square,
    elevation,
    ...other
  } = props;
  warning(elevation >= 0 && elevation < 25, `Material-UI: this elevation \`${elevation}\` is not implemented.`);
  const className = classNames(classes.root, classes[`elevation${elevation}`], !square && classes.rounded, classNameProp);
  return <Component className={className} {...other} />;
}

const defaultProps = {
  component: 'div',
  elevation: 2,
  square: false
};
const meta = {
  component: Paper || null,
  defaultProps: defaultProps || null,
  styles: styles || null
};
export default meta;