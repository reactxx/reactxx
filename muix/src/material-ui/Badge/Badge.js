import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '../styles/withStyles';
import { capitalize } from '../utils/helpers';
const RADIUS = 12;
export const styles = theme => ({
  root: {
    position: 'relative',
    display: 'inline-flex',
    // For correct alignment with the text.
    verticalAlign: 'middle'
  },
  badge: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -RADIUS,
    right: -RADIUS,
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeight,
    fontSize: theme.typography.pxToRem(RADIUS),
    width: RADIUS * 2,
    height: RADIUS * 2,
    borderRadius: '50%',
    backgroundColor: theme.palette.color,
    color: theme.palette.textColor,
    zIndex: 1 // Render the badge on top of potential ripples.

  },
  colorPrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  colorSecondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  colorError: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText
  }
});

function Badge(props) {
  const {
    $system: {
      classNames,
      classNamesStr
    },
    badgeContent,
    children,
    classes,
    className: classNameProp,
    color,
    component: ComponentProp,
    ...other
  } = props;
  const badgeClassName = classNames(classes.badge, color !== 'default' && classes[`color${capitalize(color)}`]);
  return <ComponentProp className={classNames(classes.root, classNameProp)} {...other}>
      {children}
      <span className={classNamesStr(badgeClassName)}>{badgeContent}</span>
    </ComponentProp>;
}

export default withStyles(styles, {
  name: 'MuiBadge',
  defaultProps: {
    color: 'default',
    component: 'span'
  }
})(Badge);