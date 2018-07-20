import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
export const styles = theme => ({
  root: {
    display: 'block',
    margin: 0
  },
  display4: theme.typography.display4,
  display3: theme.typography.display3,
  display2: theme.typography.display2,
  display1: theme.typography.display1,
  headline: theme.typography.headline,
  title: theme.typography.title,
  subheading: theme.typography.subheading,
  body2: theme.typography.body2,
  body1: theme.typography.body1,
  caption: theme.typography.caption,
  button: theme.typography.button,
  alignLeft: {
    textAlign: 'left'
  },
  alignCenter: {
    textAlign: 'center'
  },
  alignRight: {
    textAlign: 'right'
  },
  alignJustify: {
    textAlign: 'justify'
  },
  noWrap: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  gutterBottom: {
    marginBottom: '0.35em'
  },
  paragraph: {
    marginBottom: 16
  },
  colorInherit: {
    color: 'inherit'
  },
  colorPrimary: {
    color: theme.palette.primary.main
  },
  colorSecondary: {
    color: theme.palette.secondary.main
  },
  colorTextSecondary: {
    color: theme.palette.text.secondary
  },
  colorError: {
    color: theme.palette.error.main
  }
});

function Typography(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    align,
    classes,
    className: classNameProp,
    component: componentProp,
    color,
    gutterBottom,
    headlineMapping,
    noWrap,
    paragraph,
    variant,
    ...other
  } = props;
  const className = classNames(classes.root, classes[variant], color !== 'default' && classes[`color${capitalize(color)}`], noWrap && classes.noWrap, gutterBottom && classes.gutterBottom, paragraph && classes.paragraph, align !== 'inherit' && classes[`align${capitalize(align)}`], classNameProp);
  const Component = componentProp || (paragraph ? 'p' : headlineMapping[variant]) || 'span';
  return <Component className={className} {...other} />;
}

export default withStyles(styles, {
  name: 'MuiTypography',
  defaultProps: {
    align: 'inherit',
    color: 'default',
    gutterBottom: false,
    headlineMapping: {
      display4: 'h1',
      display3: 'h1',
      display2: 'h1',
      display1: 'h1',
      headline: 'h1',
      title: 'h2',
      subheading: 'h3',
      body2: 'aside',
      body1: 'p'
    },
    noWrap: false,
    paragraph: false,
    variant: 'body1'
  }
})(Typography);